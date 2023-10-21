import { Dialect } from "sequelize";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CACHE_TIME: string;
            DB_IP: string;
            DB_PORT: string;
            DB_SSL: string;
            DB_DIALECT: Dialect;
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            HASH_ROUNDS: string;
            JWT_TIMEOUT_TOKEN: string;
            JWT_ALGORITHM: string;
            JWT_SECRET_PKCS8: string;
            JWT_PUBLIC: string;
            SERVER_SSL_CERT: string;
            SERVER_SSL_KEY: string;
        }
    }
}
