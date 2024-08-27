import { Request, Response } from "express";
import { IProfileRepository } from "../../../repositories/IProfileRepository";
import { MappingListRecentProfileResponseDto } from "./GetRecentProfileDto";
import { IController } from "../../IController";

export class GetRecentProfileController implements IController {
  constructor(private profilesRepository: IProfileRepository) {}

  async handle(request: Request, response: Response) {
    const recents = await this.profilesRepository.recents();

    const recentsDto = MappingListRecentProfileResponseDto(recents);

    return response.json(recentsDto);
  }
}
