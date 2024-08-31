import express from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import { uploadFileController } from "../useCases/PictureUseCases/UploadFile";
import { removeFileController } from "../useCases/PictureUseCases/RemoveFile";

const router = express.Router();

router.post("/upload", uploadMiddleware.single("arquivo"), (req, res) =>
  uploadFileController.handle(req, res)
);
router.delete("/remove", (req, res) => removeFileController.handle(req, res));

export { router };
