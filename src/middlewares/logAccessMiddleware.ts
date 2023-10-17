import { Request, Response, NextFunction } from "express";
import { logInfoAccess } from "../utils/logger";

export const logAccessMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logInfoAccess(
        `IP: ${req.ip} | Host: ${req.hostname} | Protocol: ${
            req.protocol
        } | Method: ${req.method} | Path: ${req.path} | Query: ${JSON.stringify(
            req.query
        )} | Params: ${JSON.stringify(req.params)}`
    );

    next();
};
