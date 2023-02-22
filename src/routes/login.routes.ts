import { Router } from "express";
import { LoginUser } from "../controllers/login.cottroles";

const routeLogin: Router = Router();

routeLogin.post("", LoginUser);

export { routeLogin };
