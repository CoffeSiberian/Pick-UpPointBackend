import { Request, NextFunction } from "express";
import {
    getAllUserInfo as getAllUserInfoR,
    getTotalPurchasesByUser,
    getTotalAmountSpentByUser,
} from "../../repositories/UsersR";
import { ResponseJwt } from "../../types/ResponseExtends";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getAllUserInfoProfile = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    try {
        const user = await getAllUserInfoR(
            res.jwtPayload.id,
            res.jwtPayload.fk_store
        );
        if (!user) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        const totalPurchases = await getTotalPurchasesByUser(res.jwtPayload.id);
        const totalSpent = await getTotalAmountSpentByUser(res.jwtPayload.id);

        res.json({
            user,
            totalPurchases,
            totalSpent: totalSpent || 0,
        });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
