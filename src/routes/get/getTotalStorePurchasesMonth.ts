import { Request, NextFunction } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import { getTotalStorePurchasesBetweenLast30Days } from "../../repositories/PurchasesR";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getTotalStorePurchasesMonth = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    try {
        const purchases = await getTotalStorePurchasesBetweenLast30Days(
            res.jwtPayload.fk_store
        );

        res.json({ purchases });
        return next();
    } catch (err: any) {
        console.log(err);
        dbErrors(err, res);
        next();
    }
};
