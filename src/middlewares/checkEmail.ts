import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../erros";

const CheckEmailUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const data = req.body;
  const QueryCheckEmailExist: string = `
    SELECT
      COUNT(*)
    FROM 
      users
    WHERE
      email = $1;
  `;

  const QueryConfigCheckEmail: QueryConfig = {
    text: QueryCheckEmailExist,
    values: [data.email],
  };

  const checkEmail: QueryResult<{ count: string }> = await client.query(
    QueryConfigCheckEmail
  );

  if (checkEmail.rows[0].count === "1") {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};

export default CheckEmailUser;
