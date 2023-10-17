import { sequelize } from "./models/database";
import { logInfo } from "./utils/logger";

export const syncDataBase = async () => {
    await sequelize.sync({ force: false, alter: false });
    logInfo("Database synced");
};
