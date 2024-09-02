import z from "zod";

export const DeleteProfileRequestDtoScheme = z.object({
  idProfile: z.string().min(1),
});

export type DeleteProfileRequestDto = z.infer<
  typeof DeleteProfileRequestDtoScheme
>;
