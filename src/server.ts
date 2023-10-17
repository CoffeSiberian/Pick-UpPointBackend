import express, { Express } from "express";
import { logError, logInfo } from "./utils/logger";
import { syncDataBase } from "./app";
import https from "https";
import Router from "./routes/Router";
import cors from "cors";
import { PORT, SERVER_CRT_SSL, SERVER_KEY_SSL } from "./utils/configs";

const app: Express = express();

app.use(cors());
app.use(express.json());
Router(app);

const credentials = {
    cert: SERVER_CRT_SSL,
    key: SERVER_KEY_SSL,
};

const httpsServer = https.createServer(credentials, app);

syncDataBase()
    .then(() => {
        httpsServer.listen(PORT);
        logInfo(`Server running on port ${PORT}`);
    })
    .catch((err) => {
        logError(`Error while trying to connect to database: ${err.message}`);
    });
