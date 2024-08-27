import { Request, Response } from "express";
import { IGoogleUserRepository } from "../../../repositories/IGoogleUserRepository";
import { IController } from "../../IController";
import {
  IGetGoogleUserRequestDto,
  MappingGetGoogleUserResponseDto,
} from "./GetGoogleUserDto";

export class GetAllCategoryController implements IController {
  constructor(private googleUserRepository: IGoogleUserRepository) {}

  async handle(request: Request, response: Response) {
    const query: IGetGoogleUserRequestDto =
      request.query as unknown as IGetGoogleUserRequestDto;
    if (!query.id) return response.status(400).send("id in query is missing");

    const googleUser = await this.googleUserRepository.get(query.id);
    if (!googleUser) return response.sendStatus(404);

    const googleUserDto = MappingGetGoogleUserResponseDto(googleUser);
    return response.json(googleUserDto);
  }
}
