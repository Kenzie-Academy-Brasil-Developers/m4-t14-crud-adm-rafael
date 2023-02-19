import format from "pg-format";
import {
  IEditUser,
  IUser,
  IUserRequest,
  IUserResult,
  IUserResultComplet,
  IUserWithoutPassword,
} from "../../interfaces";
import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../erros";

const editUsersService = async (
  id: number,
  data: IEditUser,
  admin: boolean
): Promise<IUserWithoutPassword> => {
  let keys = Object.keys(data);
  let values = Object.values(data);

  const queryCheckEmail: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
  `;

  const QueryConfigCheckEmail: QueryConfig = {
    text: queryCheckEmail,
    values: [data.email],
  };

  const checkEmail = await client.query(QueryConfigCheckEmail);

  if (checkEmail.rowCount !== 0) {
    if (checkEmail.rows[0].id !== id && !admin) {
      throw new AppError("E-mail already registered", 409);
    }
  }

  const updates: Array<string> = keys.map((e, i) => `${e} = '${values[i]}'`);

  let query: string = `
    UPDATE 
        users
    SET 
        (%UP)
    WHERE 
       id = $1 
    RETURNING id,name,email,admin,active;
    `;

  query = query.replace("(%UP)", `${updates}`);

  const QueryConfig: QueryConfig = {
    text: query,
    values: [id],
  };

  const result: QueryResult<IUserWithoutPassword> = await client.query(
    QueryConfig
  );

  return result.rows[0];
};

export { editUsersService };
