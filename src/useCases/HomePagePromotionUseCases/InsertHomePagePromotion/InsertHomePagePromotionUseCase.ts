import { HomePagePromotion } from "../../../entities/HomePagePromotion";
import { IHomePagePromotionRepository } from "../../../repositories/IHomePagePromotionRepository";
import { IUseCase } from "../../IUseCase";
import { InsertHomePagePromotionRequestDto } from "./InsertHomePagePromotionDto";

export class InsertHomePagePromotionUseCase
  implements IUseCase<InsertHomePagePromotionRequestDto, void>
{
  constructor(
    private homePagePromotionRepository: IHomePagePromotionRepository
  ) {}
  async execute(request: InsertHomePagePromotionRequestDto): Promise<void> {
    const hpp = HomePagePromotion.create({
      order: request.order,
      profielId: request.profileId,
    });

    await this.homePagePromotionRepository.create(hpp);
  }
}
