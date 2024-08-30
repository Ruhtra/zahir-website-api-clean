import multer from "multer";
import mime from "mime";

// Configuração básica do multer
const storage = multer.memoryStorage(); // Armazena o arquivo na memória como um buffer

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB
  fileFilter(_req, file, cb) {
    const type = mime.extension(file.mimetype);
    const conditions = ["png", "jpg", "jpeg"];

    if (conditions.includes(type)) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});
