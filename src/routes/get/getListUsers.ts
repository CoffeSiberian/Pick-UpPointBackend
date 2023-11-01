import { Request, NextFunction } from "express";
import { getListUsers as getListUsersR } from "../../repositories/UsersR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const getListUsers = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const queryData = validateQueryData(req);
    if (!queryData) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const { limit_start, limit_end } = queryData;

    try {
        const Users = await getListUsersR(
            res.jwtPayload.fk_store,
            limit_start,
            limit_end
        );

        if (!Users) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.json(Users);
        return next();
    } catch (err: any) {
        next({ err });
    }
};

interface QueryData {
    limit_start: number;
    limit_end: number;
}

const validateQueryData = (req: Request): null | QueryData => {
    const limit_start = req.query.limit_start;
    const limit_end = req.query.limit_end;

    if (!limit_start || typeof limit_start !== "string") {
        return null;
    }
    if (!limit_end || typeof limit_end !== "string") return null;

    const limit_startParse = parseInt(limit_start);
    const limit_endParse = parseInt(limit_end);
    if (isNaN(limit_startParse) || isNaN(limit_endParse)) {
        return null;
    }

    return {
        limit_start: limit_startParse,
        limit_end: limit_endParse,
    };
};
