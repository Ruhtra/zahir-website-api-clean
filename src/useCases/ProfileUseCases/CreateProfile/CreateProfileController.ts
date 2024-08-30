import { Request, Response } from "express";
import { IController } from "../../IController";
import {
  CreateProfileRequestDto,
  CreateProfileRequestDtoScheme,
} from "./CreateProfileDto";
import { CreateProfileUseCase } from "./CreateProfileUseCase";
import { ZodError } from "zod";

export class CreateProfileController implements IController {
  constructor(private createProfileUseCase: CreateProfileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const profileDto: CreateProfileRequestDto =
        CreateProfileRequestDtoScheme.parse(request.body);

      await this.createProfileUseCase.execute(profileDto);
      return response.sendStatus(200);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);

        return response.status(400).json(error.errors);
      }
      console.log(error);
      return response.sendStatus(500);
    }
  }
}
