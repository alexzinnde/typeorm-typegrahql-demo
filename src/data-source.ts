import "reflect-metadata";
import { DataSource } from "typeorm";
import Recipe from "./entity/Recipe";

const {
  DB_HOST: host,
  DB_USER: username,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port: 5432,
  username,
  password,
  database,
  synchronize: true,
  logging: true,
  entities: [Recipe],
  migrations: [],
  subscribers: [],
});
