import { IEditUser, IUserWithoutPassword } from "../../interfaces";
import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const EditUsersService = async (
  id: number,
  data: IEditUser,
  admin: boolean
): Promise<IUserWithoutPassword> => {
  let keys = Object.keys(data);
  let values = Object.values(data);

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

export { EditUsersService };
