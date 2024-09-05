import { Request, Response } from "express";
import { IController } from "../../IController";
import { ZodError } from "zod";
import { InsertHomePagePromotionUseCase } from "./InsertHomePagePromotionUseCase";
import { InsertHomePagePromotionRequestDtoScheme } from "./InsertHomePagePromotionDto";

export class InsertHomePagePromotionController implements IController {
  constructor(
    private insertHomePagePromotionUseCase: InsertHomePagePromotionUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const bodyRequest = InsertHomePagePromotionRequestDtoScheme.parse(
        request.body
      );
      await this.insertHomePagePromotionUseCase.execute(bodyRequest);

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
