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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          // P2025 is the error code for "Record to delete does not exist."
          console.error(
            `Profile with id ${request.query.idProfile} does not exist.`
          );
        }
      }

      if (error instanceof ZodError) {
        console.log(error.errors);
        return response.status(400).json(error.errors);
      }
      console.log(error);
      return response.sendStatus(500);
    }
  }
}
