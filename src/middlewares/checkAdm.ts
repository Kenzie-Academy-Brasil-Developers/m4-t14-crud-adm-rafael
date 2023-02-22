import { NextFunction, Request, Response } from "express";
import { AppError } from "../erros";
import jwt from "jsonwebtoken";

const CheckAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number | undefined = Number(req.params.id) || undefined;

  console.log(id);
  console.log(req.user);

  if (id && id === Number(req.user.idUser)) {
    next();
  } else if (req.user.typeUser) {
    next();
  } else if (id !== req.user.idUser || !req.user.typeUser) {
    throw new AppError("Insufficient Permission", 403);
  }
};

export { CheckAdm };
