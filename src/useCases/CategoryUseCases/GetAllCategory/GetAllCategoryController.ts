import { Request, Response } from "express";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { MappingListCategoryResponseDto } from "./GetAllCategoryDto";

export class GetAllCategoryController {
  constructor(private categoryRepository: ICategoryRepository) {}

  async handle(request: Request, response: Response) {
    const category = await this.categoryRepository.all();

    const categoryDto = MappingListCategoryResponseDto(category);

    return response.json(categoryDto);
  }
}
