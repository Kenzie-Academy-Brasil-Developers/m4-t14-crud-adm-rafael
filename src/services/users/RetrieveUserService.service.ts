import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../erros";
import { IUserWithoutPassword, IUser } from "../../interfaces";

const RetrieveUserService = async (
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

export { RetrieveUserService };
