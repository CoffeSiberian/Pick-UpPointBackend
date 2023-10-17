import { Request, Response, NextFunction } from "express";
import { InfoResponse } from "../utils/InfoResponse";
import { ResponseJwt } from "../types/ResponseExtends";
import { verifyJWT } from "../utils/jwt";
import { checkHash } from "../utils/hash";
import { SV_USERNAME, SV_PASSWORD_HASH } from "../utils/configs";

export const authJwt = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<NextFunction | any> => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    const jwt = await verifyJWT(token);
    if (jwt.passed) return next();
    res.status(401).json(InfoResponse(401, "Unauthorized"));
};

export const authPasssServer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<NextFunction | any> => {
    const userId = req.body.userid;
    const password = req.body.password;
    if (!userId || !password) {
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    if (typeof userId !== "string" || typeof password !== "string") {
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    if (userId !== SV_USERNAME) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    checkHash(password, SV_PASSWORD_HASH, (result: boolean) => {
        if (!result) {
            return res.status(401).json(InfoResponse(401, "Unauthorized"));
        }
        res.locals.id = userId;
        res.locals.name = SV_USERNAME;
        next();
    });
};
