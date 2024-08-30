import { Request, Response } from "express";
import { IController } from "../../IController";
import { ZodError } from "zod";
import {
  UploadFileRequestDto,
  UploadFileRequestDtoScheme,
} from "./UploadFileDto";
import { UploadFileUseCase } from "./UploadFileUseCase";

//TO-DO DELETAR O ARQUIVO DO BUCKET CASO TENHA FALHA NA HORA DE ADICIONAR DADOS AO BANCO
export class UploadFileController implements IController {
  constructor(private uploadFileUseCase: UploadFileUseCase) {}
  async handle(request: Request, response: Response): Promise<any> {
    try {
      const bodyRequest: UploadFileRequestDto =
        UploadFileRequestDtoScheme.parse({
          ...request.body,
          file: request.file as Express.Multer.File,
        });

      const responseDto = await this.uploadFileUseCase.execute(bodyRequest);

      return response.json(responseDto);
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
