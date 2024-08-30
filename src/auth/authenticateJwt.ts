import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

//TODO: remove user from jwt token and get only id
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.passport?.user.token;

  if (token) {
    jwt.verify(token, env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
