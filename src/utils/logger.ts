import { createLogger, format, transports } from "winston";

const loggerSrv = createLogger({
    format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
            (info) =>
                `[${info.timestamp}] [${info.level.toUpperCase()}] ${
                    info.message
                }`
        )
    ),
    transports: [
        new transports.Console({
            silent: true,
        }),
        new transports.File({ filename: "logSrv.log" }),
    ],
});

const loggerSchemas = createLogger({
    format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
            (info) =>
                `[${info.timestamp}] [${info.level.toUpperCase()}] ${
                    info.message
                }`
        )
    ),
    transports: [
        new transports.Console({
            silent: true,
        }),
        new transports.File({ filename: "logSchemas.log" }),
    ],
});

const loggerAccess = createLogger({
    format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
            (info) =>
                `[${info.timestamp}] [${info.level.toUpperCase()}] ${
                    info.message
                }`
        )
    ),
    transports: [
        new transports.Console({
            silent: true,
        }),
        new transports.File({ filename: "logAccess.log" }),
    ],
});

const loggerResponses = createLogger({
    format: format.combine(
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.printf(
            (info) =>
                `[${info.timestamp}] [${info.level.toUpperCase()}] ${
                    info.message
                }`
        )
    ),
    transports: [
        new transports.Console({
            silent: true,
        }),
        new transports.File({ filename: "logResponses.log" }),
    ],
});

export const logError = (message: string) => {
    loggerSrv.error(message);
};

export const logWarning = (message: string) => {
    loggerSrv.warn(message);
};

export const logInfo = (message: string) => {
    loggerSrv.info(message);
};

export const logErrorSchemas = (message: string) => {
    loggerSchemas.error(message);
};

export const logWarningSchemas = (message: string) => {
    loggerSchemas.warn(message);
};

export const logInfoSchemas = (message: string) => {
    loggerSchemas.info(message);
};

export const logInfoAccess = (message: string) => {
    loggerAccess.info(message);
};

export const logInfoResponses = (message: string) => {
    loggerResponses.info(message);
};
