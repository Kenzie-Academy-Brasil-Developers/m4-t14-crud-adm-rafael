import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUserService = async (id: number): Promise<void> => {
  const query: string = `
        UPDATE
            users
        SET
            active = false
        WHERE
            id = $1;
    `;

  const QueryConfig: QueryConfig = {
    text: query,
    values: [id],
  };
  await client.query(QueryConfig);
};

export { deleteUserService };
