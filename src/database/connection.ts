import client from "./config";

const connectDataBase = async () => {
  await client.connect();
  console.log("DataBase is Running!");
};

export default connectDataBase;
