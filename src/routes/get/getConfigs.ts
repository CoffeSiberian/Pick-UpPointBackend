import { Request, NextFunction } from "express";
import { getConfigs as getConfigsR } from "../../repositories/ConfigsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getConfigs = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    try {
        const Users = await getConfigsR(res.jwtPayload.fk_store);
        if (!Users) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.json(Users);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
