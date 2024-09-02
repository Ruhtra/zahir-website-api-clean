import { z } from "zod";

export const UpdateProfileRequestDtoScheme = z
  .object({
    id: z.string().min(1).max(500),
    name: z.string().max(500),
    informations: z.string().max(500).optional(),
    movie: z.string().url().max(150).optional(),
    resume: z.string().max(500).optional(),
    address: z
      .object({
        cep: z
          .string()
          .length(8)
          .regex(/^\d{8}$/),
        city: z.string().max(150),
        complement: z.string().max(150).optional(),
        lat: z.number(),
        lng: z.number(),
        neighborhood: z.string().max(150),
        number: z.string().max(150),
        street: z.string().max(150),
        uf: z.string().length(2),
      })
      .strict()
      .optional(),
    picture: z
      .object({
        key: z.string().max(500),
        name: z.string().max(500),
        size: z.number(),
        url: z.string().max(500).url(),
      })
      .strict()
      .optional(),
    promotion: z
      .object({
        title: z.string().max(150),
        description: z.string().max(500).optional(),
      })
      .strict()
      .optional(),
    telephone: z
      .object({
        telephone: z.array(z.string().length(11)),
        whatsapp: z.array(z.string().length(11)),
      })
      .strict()
      .optional(),
    categoryGroup: z.array(z.string()),
    category: z.array(z.string()),
  })
  .strict();

export type UpdateProfileRequestDto = z.infer<
  typeof UpdateProfileRequestDtoScheme
>;
