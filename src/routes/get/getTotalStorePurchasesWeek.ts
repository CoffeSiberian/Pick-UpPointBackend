import { Request, NextFunction } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import { getTotalStorePurchasesBetweenLast7Days } from "../../repositories/PurchasesR";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getTotalStorePurchasesWeek = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    try {
        const purchases = await getTotalStorePurchasesBetweenLast7Days(
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
