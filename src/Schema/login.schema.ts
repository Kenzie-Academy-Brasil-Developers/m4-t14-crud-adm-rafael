import { z } from "zod";

const IUserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export { IUserLoginSchema };
