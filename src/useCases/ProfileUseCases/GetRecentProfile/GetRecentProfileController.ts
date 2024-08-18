import { Request, Response } from "express";
import { IProfilesRepository } from "../../../repositories/IProfilesRepository";
import { MappingListRecentProfileResponseDto } from "./GetRecentProfileDto";

export class GetRecentProfileController {
    constructor (
        private profilesRepository: IProfilesRepository
    ) {}

    async handle(request: Request, response: Response) {
        const recents = await this.profilesRepository.recents()
        
        const recentsDto = MappingListRecentProfileResponseDto(recents)

        return response.json(recentsDto)
    }
}