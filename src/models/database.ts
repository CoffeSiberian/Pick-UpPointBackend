import { Sequelize } from "sequelize-typescript";
import {
    DB_IP,
    DB_PORT,
    DB_NAME,
    DB_SSL,
    DB_DIALECT,
    DB_USERNAME,
    DB_PASSWORD,
} from "../utils/configs";
import Users from "./Users";
import Companys from "./Companys";

export const sequelize = new Sequelize({
    host: DB_IP,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
    ssl: DB_SSL,
    logging: false,
});

sequelize.addModels([Users, Companys]);
