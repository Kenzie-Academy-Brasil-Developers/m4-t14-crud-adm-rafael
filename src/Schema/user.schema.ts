import { hashSync } from "bcryptjs";
import { z } from "zod";

const creatUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().transform((pass) => hashSync(pass)),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const creatUserSchemaEdit = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .transform((pass) => hashSync(pass))
    .optional(),
});

const IUserSchema = creatUserSchema.extend({
  id: z.number(),
});

const ResultUserSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().transform((pass) => hashSync(pass)),
  admin: z.boolean(),
  active: z.boolean(),
});

const IUserSchemaNoPassword = IUserSchema.omit({
  password: true,
});

const IUserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export {
  creatUserSchema,
  IUserSchema,
  IUserSchemaNoPassword,
  ResultUserSchema,
  IUserLoginSchema,
  creatUserSchemaEdit,
};
