import { Router } from "express";

const router = Router()

router.get("/oauth/google", (req, res) => res.send(200))

export { router }