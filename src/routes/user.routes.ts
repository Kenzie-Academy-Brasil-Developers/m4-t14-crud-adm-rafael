import { Router } from "express";
import {
  checkUserProfile,
  CreatUsers,
  deleteUser,
  editUserControllers,
  listAllUSers,
  reactivatingUser,
} from "../controllers/Users.cotrollers";
import { checkToken } from "../middlewares/loginCheckToken";

import { CheckIdUser } from "../middlewares/checkiIdUser";

const useRoutes: Router = Router();

useRoutes.post("", CreatUsers);

useRoutes.get("", checkToken, listAllUSers);
useRoutes.get("/profile", checkToken, checkUserProfile);
useRoutes.patch("/:id", CheckIdUser, checkToken, editUserControllers);
useRoutes.delete("/:id", CheckIdUser, checkToken, deleteUser);
useRoutes.put("/:id/recover", CheckIdUser, checkToken, reactivatingUser);

export default useRoutes;
