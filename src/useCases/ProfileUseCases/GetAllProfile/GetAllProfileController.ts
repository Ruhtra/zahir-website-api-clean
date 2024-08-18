import { Request, Response } from "express";
import { ProfileRepository } from "../../../repositories/implemetations/ProfileRepository";
import { MappingListAllProfileResponseDto } from "./GetAllProfileDto";

export class GetAllprofileController {
    constructor (
        private profileRepository: ProfileRepository
    ) {}

    async handle(request: Request, response: Response) {
        try {
            const profiles = await this.profileRepository.all()

            const profileDto = MappingListAllProfileResponseDto(profiles)

            return response.json(profileDto)
        } catch (error) {
            console.error(error);
            return response.status(500).send("Erro ao buscar profiles")
        }
    }
}