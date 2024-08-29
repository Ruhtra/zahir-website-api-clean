import { z } from "zod";

export const CreateProfileRequestDtoSchema = z
  .object({
    name: z.string(),
    informations: z.string().optional(),
    movie: z.string().url().optional(),
    resume: z.string().optional(),
    address: z
      .object({
        cep: z.string().length(8, "CEP deve conter exatamente 8 caracteres"),
        city: z.string(),
        complement: z.string().optional(),
        lat: z.number(),
        lng: z.number(),
        neighborhood: z.string(),
        number: z.string(),
        street: z.string(),
        uf: z
          .string()
          .length(2, "UF deve conter exatamente 2 caracteres")
          .regex(/^[A-Za-z]{2}$/, "UF deve conter apenas letras"),
      })
      .strict()
      .optional(),
    picture: z
      .object({
        key: z.string(),
        name: z.string(),
        size: z.number(),
        url: z.string().url(),
      })
      .strict()
      .optional(),
    promotion: z
      .object({
        title: z.string(),
        description: z.string().optional(),
      })
      .strict()
      .optional(),
    telephone: z
      .object({
        telephone: z.array(
          z.string().length(13, "Telefone deve conter exatamente 13 caracteres")
        ),

        whatsapp: z.array(
          z.string().length(13, "WhatsApp deve conter exatamente 13 caracteres")
        ),
      })
      .strict()
      .optional(),
    categoryGroup: z.array(
      z
        .object({
          name: z.string(),
        })
        .strict()
    ),
    category: z.array(
      z
        .object({
          name: z.string(),
        })
        .strict()
    ),
  })
  .strict();

export type CreateProfileRequestDto = z.infer<
  typeof CreateProfileRequestDtoSchema
>;
