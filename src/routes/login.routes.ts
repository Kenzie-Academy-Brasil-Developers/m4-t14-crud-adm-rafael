import { Router } from "express";
import { loginUser } from "../controllers/login.cottroles";

const routeLogin: Router = Router();

routeLogin.post("", loginUser);

export { routeLogin };
