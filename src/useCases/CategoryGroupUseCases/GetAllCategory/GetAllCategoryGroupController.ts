import { Request, Response } from "express";
import { ICategoryGroupRepository } from "../../../repositories/ICategoryGroupRepository";
import { MappingListCategoryGroupResponseDto } from "./GetAllCategoryGroupDto";

export class GetAllCategoryGroupController {
  constructor(private categoryGroupRepository: ICategoryGroupRepository) {}

  async handle(request: Request, response: Response) {
    const categoryGroup = await this.categoryGroupRepository.all();

    const categoryGroupDto = MappingListCategoryGroupResponseDto(categoryGroup);

    return response.json(categoryGroupDto);
  }
}
