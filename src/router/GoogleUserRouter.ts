import express from "express";
import { getGoogleUserController } from "../useCases/GoogleUserUseCase/GetGoogleUser";

const router = express.Router();

// router.get("/get", (req, res) => getGoogleUserController.handle(req, res));

export { router };
