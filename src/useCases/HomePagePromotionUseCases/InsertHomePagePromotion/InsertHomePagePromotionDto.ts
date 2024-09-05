import { z } from "zod";

export const InsertHomePagePromotionRequestDtoScheme = z
  .object({
    order: z.number().min(1).max(7),
    profileId: z.string(),
  })
  .strict();

export type InsertHomePagePromotionRequestDto = z.infer<
  typeof InsertHomePagePromotionRequestDtoScheme
>;
