import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IUserRequest, IUserWithoutPassword } from "../../interfaces";
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
    RETURNING id, name,email,admin,active;
        `,
    Object.keys(data),
    Object.values(data)
  );

  const QueryResult: QueryResult<IUserWithoutPassword> = await client.query(
    queryString
  );

  return QueryResult.rows[0];
};

export { CreatUserServices };
