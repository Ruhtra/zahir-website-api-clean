import { z } from "zod";

export const RemoveHomePagePromotionRequestDtoScheme = z
  .object({
    profileId: z.string(),
  })
  .strict();

export type RemoveHomePagePromotionRequestDto = z.infer<
  typeof RemoveHomePagePromotionRequestDtoScheme
>;
