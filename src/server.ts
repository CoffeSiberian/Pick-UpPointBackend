import express, { Express } from "express";
import { logError, logInfo } from "./utils/logger";
import { syncDataBase } from "./app";
import https from "https";
import http from "http";
import Router from "./routes/Router";
import cors from "cors";
import { PORT, LISTEN, SERVER_CRT_SSL, SERVER_KEY_SSL } from "./utils/configs";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Router(app);

const credentials = {
    cert: SERVER_CRT_SSL,
    key: SERVER_KEY_SSL,
};

const httpsServer = https.createServer(credentials, app);
// const httpServer = http.createServer(app);

syncDataBase()
    .then(() => {
        httpsServer.listen(PORT, LISTEN);
        // httpServer.listen(PORT, LISTEN);
        logInfo(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
    })
    .catch((err) => {
        logError(`Error while trying to connect to database: ${err.message}`);
        console.log(
            `Error while trying to connect to database: ${err.message}`
        );
    });
