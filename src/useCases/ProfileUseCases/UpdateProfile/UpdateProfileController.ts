import { Request, Response } from "express";
import { IController } from "../../IController";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";
import { UpdateProfileRequestDtoScheme } from "./UpdateProfileDto";

export class UpdateProfileController implements IController {
  constructor(private updateProfileUseCase: UpdateProfileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const updateProfile = UpdateProfileRequestDtoScheme.parse(request.body);
      await this.updateProfileUseCase.execute(updateProfile);
    } catch (error) {
      console.log(error);
      return response.sendStatus(500);
    }
  }
}
