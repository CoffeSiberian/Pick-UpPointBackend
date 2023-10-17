import { Request, Response, NextFunction } from "express";
import { logInfoResponses } from "../utils/logger";

export const logResponsesMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logInfoResponses(
        `IP: ${req.ip} | Host: ${req.hostname} | Protocol: ${
            req.protocol
        } | Method: ${req.method} | Status: ${res.statusCode} | Path: ${
            req.path
        } | Query: ${JSON.stringify(req.query)} | Params: ${JSON.stringify(
            req.params
        )}`
    );

    if (!res.headersSent) next();
};
