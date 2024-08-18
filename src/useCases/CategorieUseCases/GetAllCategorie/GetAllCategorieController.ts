import { Request, Response } from "express";
import { ICategorieRepository } from "../../../repositories/ICategorieRepository";
import { MappingListCategorieResponseDto } from "./GetAllCategorieDto";

export class GetAllCategorieController {
    constructor(
        private categorieRepository : ICategorieRepository
    ) { }

    async handle(request: Request, response: Response) {
        const categories = await this.categorieRepository.all()

        const categoriesDto = MappingListCategorieResponseDto(categories)

        return response.json(categoriesDto)

    }
}