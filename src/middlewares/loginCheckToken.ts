import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros";
import jwt from "jsonwebtoken";
import { number } from "zod";

const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (token === "Bearer") {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token?.split(" ")[1];

  jwt.verify(token!, process.env.SECRET_KEY!, (error, decod: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    req.user = {
      idUser: Number(decod.sub),
      typeUser: decod.admim,
    };
    next();
  });
};

export { checkToken };
