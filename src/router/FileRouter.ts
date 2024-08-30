import express from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import { uploadFileController } from "../useCases/FileUseCases/UploadFile";

const router = express.Router();

router.post("/upload", uploadMiddleware.single("arquivo"), (req, res) =>
  uploadFileController.handle(req, res)
);

export { router };
