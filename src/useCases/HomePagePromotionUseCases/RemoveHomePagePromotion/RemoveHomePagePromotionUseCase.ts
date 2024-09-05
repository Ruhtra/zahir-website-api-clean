import { IHomePagePromotionRepository } from "../../../repositories/IHomePagePromotionRepository";
import { IUseCase } from "../../IUseCase";
import { RemoveHomePagePromotionRequestDto } from "./RemoveHomePagePromotionDto";

export class RemoveHomePagePromotionUseCase
  implements IUseCase<RemoveHomePagePromotionRequestDto, void>
{
  constructor(
    private homePagePromotionRepository: IHomePagePromotionRepository
  ) {}

  async execute({
    profileId,
  }: RemoveHomePagePromotionRequestDto): Promise<void> {
    this.homePagePromotionRepository.remove(profileId);
  }
}
