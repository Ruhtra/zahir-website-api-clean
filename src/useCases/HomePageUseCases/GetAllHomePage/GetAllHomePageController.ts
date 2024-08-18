import { Request, Response } from "express";
import { IHomePageRepository } from "../../../repositories/IHomePageRepository";
import { MappingListHomePageResponseDto } from "./GetAllHomePageDto";

export class GetAllHomePageController {
    constructor(
        private homePageRepository : IHomePageRepository
    ) { }

    async handle(request: Request, response: Response) {
        const r = await this.homePageRepository.all()

        const dto = MappingListHomePageResponseDto(r)

        return response.json(dto)
    }
}