import { Request, Response } from "express";
import { IController } from "../../IController";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";
import { UpdateProfileRequestDtoScheme } from "./UpdateProfileDto";
import { resourceUsage } from "process";
import { ZodError } from "zod";

export class UpdateProfileController implements IController {
  constructor(private updateProfileUseCase: UpdateProfileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const updateProfile = UpdateProfileRequestDtoScheme.parse(request.body);
      await this.updateProfileUseCase.execute(updateProfile);

      return response.send(200);
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
