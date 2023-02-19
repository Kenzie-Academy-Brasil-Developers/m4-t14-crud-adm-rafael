import { IUserWithoutPassword, IUserResult } from "../../interfaces";
import { client } from "../../database";

const ListAllUSersService = async (): Promise<Array<IUserWithoutPassword>> => {
  const query: string = `
        SELECT
          id,email,admim,active
        FROM 
          users;
    `;

  const result: IUserResult = await client.query(query);

  return result.rows;
};

export { ListAllUSersService };
