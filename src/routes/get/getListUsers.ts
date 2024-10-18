import { Request, NextFunction } from "express";
import { getListUsers as getListUsersR } from "../../repositories/UsersR";
import { InfoResponse } from "../../utils/InfoResponse";
import { validateQueryPagination } from "../../utils/queryValidations";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getListUsers = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const queryDataPagination = validateQueryPagination(req);
    if (!queryDataPagination) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const { limit_start, limit_end } = queryDataPagination;

    try {
        const users = await getListUsersR(
            res.jwtPayload.fk_store,
            limit_start,
            limit_end
        );

        if (!users) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json({ users });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
