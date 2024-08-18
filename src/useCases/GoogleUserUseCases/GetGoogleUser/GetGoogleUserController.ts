import { Request, Response } from "express";
import { IGoogleUserRepository } from "../../../repositories/IGoogleUserRepository";

export class GetGoogleUserController {
    constructor(
        private googleUserRepository: IGoogleUserRepository
    ) { }

    async handle(request: Request, response: Response) {
        const userId = request.session.userId
        if (!userId) return response.sendStatus(401)
        else {
            const user = await this.googleUserRepository.findById(userId)
            return response.json(user)
        }
    }
}