import { Request, Response, NextFunction } from "express";
import { logErrorSchemas } from "../utils/logger";
import { getConfigs } from "../repositories/ConfigsR";
import { getUserByEmail } from "../repositories/UsersR";
import { loginAdminSchema, loginUserSchema } from "../schemas/AuthenticateSch";
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
    const { error, value } = loginAdminSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`authAdmin: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const body = value as LoginAdmin;

    const configs = await getConfigs(body.fk_store);
    if (!configs) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    if (body.username !== configs.adminname) {
        return res.status(401).json(InfoResponse(401, "Unauthorized"));
    }

    checkHash(body.password, configs.adminpassword, (result: boolean) => {
        if (!result) {
            return res.status(401).json(InfoResponse(401, "Unauthorized"));
        }
        res.locals.id = configs.adminname;
        res.locals.fk_store = configs.fk_store;
        res.locals.isAdmin = true;
        next();
    });
};

export const authUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<NextFunction | any> => {
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
        res.locals.isAdmin = false;
        res.locals.fk_store = user.fk_store;
        next();
    });
};
