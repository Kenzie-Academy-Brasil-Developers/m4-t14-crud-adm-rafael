import { QueryResult } from "pg";
import {
  creatUserSchema,
  creatUserSchemaEdit,
  IUserSchema,
  IUserSchemaNoPassword,
  ResultUserSchema,
} from "../Schema/user.schema";
import { z } from "zod";
import { IUserLoginSchema } from "../Schema/login.schema";

type IUserRequest = z.infer<typeof creatUserSchema>;

type IUser = z.infer<typeof IUserSchema>;

type IUserWithoutPassword = z.infer<typeof IUserSchemaNoPassword>;
type IUserResult = QueryResult<IUserWithoutPassword>;

type IUserResultComplet = QueryResult<z.infer<typeof ResultUserSchema>>;
type IUserLogin = z.infer<typeof IUserLoginSchema>;
type IEditUser = z.infer<typeof creatUserSchemaEdit>;

export {
  IUserRequest,
  IUser,
  IUserWithoutPassword,
  IUserResult,
  IUserResultComplet,
  IUserLogin,
  IEditUser,
};
