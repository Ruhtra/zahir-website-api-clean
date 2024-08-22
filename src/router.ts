import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.get("/oauth/google", (req, res) => res.send(200));

router.get("/auth/callback", authMiddleware, async function (req, res) {
  const jwt = req.decoded;
  if (!jwt) return res.sendStatus(401);

  console.log("session");
  console.log(req.decoded);

  return res.status(200).json(req.decoded);
});

declare global {
  namespace Express {
    interface Request {
      decoded: any;
    }
  }
}
const base64Secret =
  "egNSsfo/KaIA+0vrWULLOgf7rJCQSGy3+TpAQ9L8U9NusOWFmFAAnMWHdOVCD8VpZiphICInU835LbFzietzIw==";

// const jwtSecret = Buffer.from(base64Secret, "base64").toString("utf8");

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401);
  }

  try {
    const decoded = parseJWTToken(token, base64Secret);
    req.decoded = decoded;

    console.log(`Received request from ${decoded}`);
    next();
  } catch (err) {
    console.error(`Error parsing token: ${err}`);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

function parseJWTToken(token: string, hmacSecret: string): string {
  try {
    const tkn = token.split("Bearer ")[1];
    const decoded = jwt.verify(tkn, hmacSecret);

    if (decoded) {
      return decoded;
    } else {
      throw new Error("Invalid token");
    }
  } catch (err) {
    throw new Error(`Error validating token: ${err.message}`);
  }
}

export { router };
