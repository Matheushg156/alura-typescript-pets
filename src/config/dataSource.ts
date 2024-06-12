import { DataSource } from "typeorm";
import { PetEntity } from "../entities/PetEntity";
import { AdotanteEntity } from "../entities/AdotanteEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite", // caminho para o arquivo do banco de dados SQLite
  synchronize: true,
  logging: false,
  entities: [PetEntity, AdotanteEntity], //todas as entidades da aplicação devem ser inseridas aqui
  migrations: [],
  subscribers: [],
});
