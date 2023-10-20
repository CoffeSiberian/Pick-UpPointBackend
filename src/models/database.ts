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
import Stores from "./Stores";
import Configs from "./Configs";
import Users from "./Users";
import Categories from "./Categories";
import Products from "./Products";
import Stocks from "./Stocks";
import Purchases from "./Purchases";
import Purchases_Items from "./Purchases_Items";
import Images_Products from "./ImagesProducts";

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

sequelize.addModels([
    Stores,
    Configs,
    Users,
    Categories,
    Products,
    Images_Products,
    Purchases,
    Purchases_Items,
    Stocks,
]);
