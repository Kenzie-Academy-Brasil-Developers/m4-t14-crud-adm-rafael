import { Request, Response } from "express";
import { IUserLoginSchema } from "../Schema/user.schema";
import { creatLogin } from "../services/login/login.service";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const data = IUserLoginSchema.parse(req.body);

  const token = await creatLogin(data);

  return res.status(200).json({
    token: token,
  });
};

export { loginUser };
