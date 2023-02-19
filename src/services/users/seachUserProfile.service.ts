import { IUserResult, IUserWithoutPassword } from "../../interfaces";
import { client } from "../../database";
import { QueryConfig } from "pg";
import { AppError } from "../../erros";

const seachUserProfile = async (id: number): Promise<IUserWithoutPassword> => {
  const query: string = `
    SELECT
      id,name,email,active,admin
    FROM 
      users
    WHERE
      id = $1;
  `;

  const QueryConfig: QueryConfig = {
    text: query,
    values: [id],
  };

  const result: IUserResult = await client.query(QueryConfig);

  if (result.rowCount === 0) {
    throw new AppError("User not foud!", 404);
  }

  return result.rows[0];
};

export { seachUserProfile };
