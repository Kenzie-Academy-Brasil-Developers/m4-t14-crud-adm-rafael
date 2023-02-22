import { QueryConfig } from "pg";
import { IUserResult, IUserWithoutPassword } from "../../interfaces";
import { client } from "../../database";

const ReactivatingUserService = async (
  id: number
): Promise<IUserWithoutPassword> => {
  const queryString: string = `
        UPDATE
          users
        SET
          active = true
        WHERE
          id = $1
        RETURNING id,name,email,active,admin;
    `;
  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const result: IUserResult = await client.query(QueryConfig);

  return result.rows[0];
};

export { ReactivatingUserService };
