import z from "zod";

export const DeleteProfileRequestDtoScheme = z.object({
  idProfile: z.string(),
});

export type DeleteProfileRequestDto = z.infer<
  typeof DeleteProfileRequestDtoScheme
>;
