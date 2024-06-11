import { DataSource } from "typeorm";
import { PetEntity } from "../entities/PetEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite", // caminho para o arquivo do banco de dados SQLite
  synchronize: true,
  logging: false,
  entities: [PetEntity], //todas as entidades da aplicação devem ser inseridas aqui
  migrations: [],
  subscribers: [],
});
