import z from "zod";

export const RemoveFileRequestDtoScheme = z.object({
  idProfile: z.string(),
});

export type RemoveFileRequestDto = z.infer<typeof RemoveFileRequestDtoScheme>;
