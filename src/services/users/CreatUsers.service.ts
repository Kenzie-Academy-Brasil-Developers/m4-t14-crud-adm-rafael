import { hash } from "bcryptjs";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { AppError } from "../../erros";
import { IUser, IUserRequest, IUserWithoutPassword } from "../../interfaces";
import { creatUserSchema } from "../../Schema/user.schema";

const CreatUserServices = async (
  useData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const data = creatUserSchema.parse(useData);

  const queryString: string = format(
    `
    INSERT INTO
      users (%I)
    VALUES 
      (%L)
    RETURNING id, name,email,admim,active;
        `,
    Object.keys(data),
    Object.values(data)
  );

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

  const QueryResult: QueryResult<IUserWithoutPassword> = await client.query(
    queryString
  );

  return QueryResult.rows[0];
};

const retrieveUserService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const query: string = `
    SELECT
      *
    FROM 
      users u
    WHERE
      id = $1;
  `;

  const QueryConfig: QueryConfig = {
    text: query,
    values: [userId],
  };

  const result: QueryResult<IUser> = await client.query(QueryConfig);

  if (result.rowCount === 0) {
    throw new AppError("User not found!", 404);
  }

  return result.rows[0];
};

export { CreatUserServices, retrieveUserService };
