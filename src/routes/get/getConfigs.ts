import { Request, Response, NextFunction } from "express";
import { getConfigs as getConfigsR } from "../../repositories/ConfigsR";
import { InfoResponse } from "../../utils/InfoResponse";

export const getConfigs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const storeId = req.query.store;
    if (!storeId || typeof storeId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const Users = await getConfigsR(storeId);
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
