import express from "express";
import { getAllprofileController } from "../useCases/ProfileUseCases/GetAllProfile";
import { getRecentProfileController } from "../useCases/ProfileUseCases/GetRecentProfile";
import { getProfileController } from "../useCases/ProfileUseCases/GetProfile";
import { createProfileController } from "../useCases/ProfileUseCases/CreateProfile";
import { deleteProfileController } from "../useCases/ProfileUseCases/DeleteProfile";
import { updateProfileController } from "../useCases/ProfileUseCases/UpdateProfile";

const router = express.Router();

router.get("/all", (req, res) => getAllprofileController.handle(req, res));
router.get("/recent", (req, res) =>
  getRecentProfileController.handle(req, res)
);
router.get("/get", (req, res) => getProfileController.handle(req, res));

router.post("/create", (req, res) => createProfileController.handle(req, res));
router.delete("/delete", (req, res) =>
  deleteProfileController.handle(req, res)
);
router.put("/update", (req, res) => updateProfileController.handle(req, res));

export { router };
