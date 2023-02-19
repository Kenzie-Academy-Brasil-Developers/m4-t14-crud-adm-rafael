import "express-async-errors";
import express, { Application } from "express";
import useRoutes from "./routes/user.routes";
import { handleErros } from "./erros";
import { routeLogin } from "./routes/login.routes";

const app: Application = express();

app.use(express.json());

app.use("/users", useRoutes);
app.use("/login", routeLogin);

app.use(handleErros);

export default app;
