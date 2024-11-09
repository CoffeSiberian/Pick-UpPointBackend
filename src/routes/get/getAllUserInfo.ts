import { Request, NextFunction } from "express";
import {
    getAllUserInfo as getAllUserInfoR,
    getTotalPurchasesByUser,
    getTotalAmountSpentByUser,
} from "../../repositories/UsersR";
import { ResponseJwt } from "../../types/ResponseExtends";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getAllUserInfo = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;

    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const user = await getAllUserInfoR(id, res.jwtPayload.fk_store);
        if (!user) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        const totalPurchases = await getTotalPurchasesByUser(
            id,
            res.jwtPayload.fk_store
        );
        const totalSpent = await getTotalAmountSpentByUser(
            id,
            res.jwtPayload.fk_store
        );

        res.json({
            user: {
                ...user,
                totalPurchases,
                totalSpent,
            },
        });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
