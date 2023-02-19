import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../erros";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserLogin, IUserResultComplet } from "../../interfaces";
import "dotenv/config";

export const creatLogin = async (data: IUserLogin): Promise<string> => {
  const { password, email } = data;
  const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            email = $1;
    `;

  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const result: IUserResultComplet = await client.query(QueryConfig);

  if (result.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword: boolean = await compare(
    password,
    result.rows[0].password
  );

  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!result.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    {
      admim: result.rows[0].admim ? result.rows[0].admim : false,
      active: result.rows[0].active,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: result.rows[0].id + "",
    }
  );

  return token;
};
