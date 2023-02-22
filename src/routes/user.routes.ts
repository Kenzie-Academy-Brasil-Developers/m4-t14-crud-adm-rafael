import { Router } from "express";
import {
  CheckUserProfile,
  CreatUsers,
  DeleteUser,
  EditUserControllers,
  ListAllUSers,
  ReactivatingUser,
} from "../controllers/Users.cotrollers";
import { CheckToken } from "../middlewares/loginCheckToken";

import { CheckIdUser } from "../middlewares/checkiIdUser";
import checkEmailUser from "../middlewares/checkEmail";
import { CheckAdm } from "../middlewares/checkAdm";

const useRoutes: Router = Router();

useRoutes.post("", checkEmailUser, CreatUsers);

useRoutes.get("", CheckToken, CheckAdm, ListAllUSers);
useRoutes.get("/profile", CheckToken, CheckUserProfile);
useRoutes.patch(
  "/:id",
  CheckIdUser,
  CheckToken,
  CheckAdm,
  checkEmailUser,
  EditUserControllers
);
useRoutes.delete("/:id", CheckIdUser, CheckToken, CheckAdm, DeleteUser);
useRoutes.put(
  "/:id/recover",
  CheckIdUser,
  CheckToken,
  CheckAdm,
  ReactivatingUser
);

export default useRoutes;
