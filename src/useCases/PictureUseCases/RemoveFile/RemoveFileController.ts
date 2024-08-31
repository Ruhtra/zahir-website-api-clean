import { Request, Response } from "express";
import { IController } from "../../IController";
import { RemoveFileRequestDtoScheme } from "./RemoveFileDto";
import { RemoveFileUseCase } from "./RemoveFileUseCase";
import { ZodError } from "zod";

export class RemoveFileController implements IController {
  constructor(private removeFileUseCase: RemoveFileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const requestBody = RemoveFileRequestDtoScheme.parse(request.query);
      await this.removeFileUseCase.execute(requestBody);
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
