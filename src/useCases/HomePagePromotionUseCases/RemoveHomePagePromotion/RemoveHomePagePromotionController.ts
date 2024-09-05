import { Request, Response } from "express";
import { IController } from "../../IController";
import { RemoveHomePagePromotionUseCase } from "./RemoveHomePagePromotionUseCase";
import { RemoveHomePagePromotionRequestDtoScheme } from "./RemoveHomePagePromotionDto";
import { ZodError } from "zod";

export class RemoveHomePagePromotionController implements IController {
  constructor(
    private removeHomePagePromotionUseCase: RemoveHomePagePromotionUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const requestParams = RemoveHomePagePromotionRequestDtoScheme.parse(
        request.query
      );

      await this.removeHomePagePromotionUseCase.execute(requestParams);

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
