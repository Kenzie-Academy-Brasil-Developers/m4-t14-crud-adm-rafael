import app from "./app";
import { connectDataBase } from "./database";

app.listen(process.env.PORT, async () => {
  await connectDataBase();
  console.log("Server is running!");
});
