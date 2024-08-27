import { Request, Response } from "express";
import {
  IGetProfileRequestDto,
  MappingProfileResponseDto,
} from "./GetprofileDto";
import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { IController } from "../../IController";

export class GetProfileController implements IController {
  constructor(private profileRepository: IProfileRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const query: IGetProfileRequestDto =
        request.query as unknown as IGetProfileRequestDto;
      if (!query.id) return response.status(400).send("id in query is missing");

      const profile = await this.profileRepository.findById(query.id);
      if (!profile) return response.sendStatus(404);

      const profileDto = MappingProfileResponseDto(profile);
      return response.json(profileDto);
    } catch (error) {
      console.error(error);
      return response.status(500).send("Erro ao procurar pelo profile");
    }
  }
}
