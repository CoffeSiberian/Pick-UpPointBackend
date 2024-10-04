import { Request, NextFunction } from "express";
import { getPurchases } from "../../repositories/PurchasesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getUserPurchases = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    try {
        const Purchases = await getPurchases(res.jwtPayload.id);
        if (!Purchases) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.json(Purchases);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
