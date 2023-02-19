import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../erros";
import { client } from "../database";
import { IUser, IUserResultComplet } from "../interfaces";

const CheckIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ids: number = Number(req.params.id);

  const query: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
  `;
  const QueryConfig: QueryConfig = {
    text: query,
    values: [ids],
  };
  const result: IUserResultComplet = await client.query(QueryConfig);

  if (Number(result.rowCount) === 0) {
    throw new AppError("User not found!", 404);
  }

  req.userIdParams = result.rows[0].active;

  next();
};

export { CheckIdUser };
