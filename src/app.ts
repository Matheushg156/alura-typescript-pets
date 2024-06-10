import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize().then(() => {
  console.log("Conectado ao banco de dados");
}).catch((error) => {
  console.log("Erro ao conectar ao banco de dados: ", error);
});

export default app;
