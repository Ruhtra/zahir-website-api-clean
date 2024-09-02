import { Request, Response } from "express";
import { IController } from "../../IController";
import { ZodError } from "zod";
import { DeleteProfileRequestDtoScheme } from "./DeleteProfileDto";
import { DeleteProfileUseCase } from "./DeleteProfileUseCase";
import { Prisma } from "@prisma/client";

export class DeleteProfileController implements IController {
  constructor(private deleteProfileUseCase: DeleteProfileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const requestBody = DeleteProfileRequestDtoScheme.parse(request.query);
      await this.deleteProfileUseCase.execute(requestBody);
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
