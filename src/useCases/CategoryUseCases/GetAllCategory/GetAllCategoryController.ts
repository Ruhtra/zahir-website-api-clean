import { Request, Response } from "express";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { MappingListCategoryResponseDto } from "./GetAllCategoryDto";
import { IController } from "../../IController";

export class GetAllCategoryController implements IController {
  constructor(private categoryRepository: ICategoryRepository) {}

  async handle(request: Request, response: Response) {
    const category = await this.categoryRepository.all();

    const categoryDto = MappingListCategoryResponseDto(category);

    return response.json(categoryDto);
  }
}
