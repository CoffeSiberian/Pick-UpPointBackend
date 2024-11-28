import { sequelize } from "./models/database";
import { STATIC_FOLDER } from "./utils/configs";
import { existsSync, mkdirSync } from "fs";
import { logInfo } from "./utils/logger";

export const syncDataBaseAndStatic = async () => {
    await sequelize.sync({ force: false, alter: false });

    if (!existsSync(STATIC_FOLDER)) {
        mkdirSync(STATIC_FOLDER, { recursive: true });
    }

    logInfo("Database synced");
};
