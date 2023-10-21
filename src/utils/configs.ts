import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const CACHE_TIME = process.env.CACHE_TIME;
export const DB_IP = process.env.DB_IP;
export const DB_PORT: number = parseInt(process.env.DB_PORT);
export const DB_SSL: boolean = Boolean(process.env.DB_SSL);
export const DB_DIALECT = process.env.DB_DIALECT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const HASH_ROUNDS: number = parseInt(process.env.HASH_ROUNDS);
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
export const JWT_SECRET_PKCS8 = process.env.JWT_SECRET_PKCS8;
export const JWT_PUBLIC = process.env.JWT_PUBLIC;
export const JWT_TIMEOUT_TOKEN = process.env.JWT_TIMEOUT_TOKEN;
export const SERVER_CRT_SSL = process.env.SERVER_CRT_SSL;
export const SERVER_KEY_SSL = process.env.SERVER_KEY_SSL;
