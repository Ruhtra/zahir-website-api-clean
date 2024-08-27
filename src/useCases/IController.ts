import { Request, Response } from "express";

export interface IController {
  handle(request: Request, Response: Response): Promise<any>;
}
