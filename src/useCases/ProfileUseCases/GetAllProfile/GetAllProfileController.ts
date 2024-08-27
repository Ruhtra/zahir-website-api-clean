import { Request, Response } from "express";
import { MappingListAllProfileResponseDto } from "./GetAllProfileDto";
import { IProfileRepository } from "../../../repositories/IProfileRepository";

export class GetAllprofileController {
  constructor(private profileRepository: IProfileRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const profiles = await this.profileRepository.all();

      const profileDto = MappingListAllProfileResponseDto(profiles);

      return response.json(profileDto);
    } catch (error) {
      console.error(error);
      return response.status(500).send("Erro ao buscar profiles");
    }
  }
}
