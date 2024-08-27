import { Request, Response } from "express";
import { IHomePagePromotionRepository } from "../../../repositories/IHomePagePromotionRepository";
import { MappingListHomePagePromotionResponseDto } from "./GetAllHomePagePromotionDto";
import { IController } from "../../IController";

export class GetAllHomePagePromotionController implements IController {
  constructor(
    private homePagePromotionRepository: IHomePagePromotionRepository
  ) {}

  async handle(request: Request, response: Response) {
    const homePagePromotions = await this.homePagePromotionRepository.all();

    const homePagePromotionsDto =
      MappingListHomePagePromotionResponseDto(homePagePromotions);

    return response.json(homePagePromotionsDto);
  }
}
