import { Request, Response, NextFunction } from "express";
import { getConfigs } from "../repositories/ConfigsR";
import { InfoResponse } from "../utils/InfoResponse";
import { ResponseJwt } from "../types/ResponseExtends";
import { verifyJWT } from "../utils/jwt";
import { checkHash } from "../utils/hash";

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

export const authAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<NextFunction | any> => {
    const userId = req.body.username;
    const password = req.body.password;
    const fk_store = req.body.fk_store;
    if (!userId || !password || !fk_store) {
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    if (
        typeof userId !== "string" ||
        typeof password !== "string" ||
        typeof fk_store !== "string"
    ) {
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const configs = await getConfigs(fk_store);
    if (!configs) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    if (userId !== configs.adminname) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    checkHash(password, configs.adminpassword, (result: boolean) => {
        if (!result) {
            return res.status(401).json(InfoResponse(401, "Unauthorized"));
        }
        res.locals.fk_store = configs.fk_store;
        next();
    });
};
