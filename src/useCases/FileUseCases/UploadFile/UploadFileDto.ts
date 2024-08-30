import z from "zod";

export const UploadFileRequestDtoScheme = z.object({
  idProfile: z.string(),
  name: z.string().min(1),
  file: z
    .object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      size: z.number(),
      buffer: z.instanceof(Buffer),
    })
    .strict(),
});

export type UploadFileRequestDto = z.infer<typeof UploadFileRequestDtoScheme>;

export interface UploadFileResponseDto {
  id: string;
}
