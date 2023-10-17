import { Request, Response, NextFunction } from "express";
import { InfoResponse } from "../../utils/InfoResponse";
import { verifyJWT as verifyJWTUtils } from "../../utils/jwt";

export const verifyJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        res.status(401).json(InfoResponse(401, "Unauthorized"));
        return next();
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        res.status(401).json(InfoResponse(401, "Unauthorized"));
        return next();
    }

    const jwt = await verifyJWTUtils(token);
    if (jwt.passed) {
        res.status(200).json(InfoResponse(200, "OK"));
        return next();
    }
    res.status(401).json(InfoResponse(401, "Unauthorized"));
    return next();
};
