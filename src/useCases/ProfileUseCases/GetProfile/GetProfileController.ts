import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ProfileRepository } from "../../../repositories/implemetations/ProfileRepository";
import { MappingProfileResponseDto } from "./GetprofileDto";

export class GetProfileController {
    constructor (
        private profileRepository : ProfileRepository
    ) {}

    async handle(request: Request, response: Response) {
        try {
            const id = request.query.id as string
            if (!id)  throw new Error("Id parameter is Required")
    
            const profile = await this.profileRepository.findById(new ObjectId(id))

            const profileDto = MappingProfileResponseDto(profile)

            return response.json(profileDto)
        } catch (error) {
            console.error(error);
            return response.status(500).send("Erro ao procurar pelo profile")
        }
    }
}