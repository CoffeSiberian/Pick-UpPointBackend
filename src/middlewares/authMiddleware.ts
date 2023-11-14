import { Request, Response, NextFunction } from "express";
import { logErrorSchemas } from "../utils/logger";
import { getUserByEmail } from "../repositories/UsersR";
import { loginUserSchema } from "../schemas/AuthenticateSch";
import { InfoResponse } from "../utils/InfoResponse";
import { ResponseJwt, ResponseUndefinedJwt } from "../types/ResponseExtends";
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

export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<NextFunction | any> => {
    // validate user and password to login and get jwt

    const { error, value } = loginUserSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`authUser: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const body = value as LoginUser;

    const user = await getUserByEmail(body.email, body.fk_store);
    if (!user) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    checkHash(body.password, user.password, (result: boolean) => {
        if (!result) {
            return res.status(401).json(InfoResponse(401, "Unauthorized"));
        }

        res.locals.id = user.id;
        res.locals.username = user.name;
        res.locals.isAdmin = user.isAdmin;
        res.locals.fk_store = user.fk_store;
        next();
    });
};

export const authMiddlewareAdmin = async (
    req: Request,
    res: ResponseUndefinedJwt,
    next: NextFunction
): Promise<NextFunction | any> => {
    // validate jwt and check if user is admin

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    const jwt = await verifyJWT(token);
    if (!jwt.payload) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    if (jwt.payload.isAdmin) {
        res.jwtPayload = jwt.payload;
        return next();
    }
    res.status(401).json(InfoResponse(401, "Unauthorized"));
};

export const authMiddlewareUser = async (
    req: Request,
    res: ResponseUndefinedJwt,
    next: NextFunction
): Promise<NextFunction | any> => {
    // validate jwt and check if user is admin

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    const jwt = await verifyJWT(token);
    if (!jwt.payload) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    res.jwtPayload = jwt.payload;
    return next();
};
