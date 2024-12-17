import { Request, NextFunction } from "express";
import { getPurchases } from "../../repositories/PurchasesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { validateQueryPagination } from "../../utils/queryValidations";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getUserPurchasesProfile = async (
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
        const purchases = await getPurchases(
            res.jwtPayload.id,
            limit_start,
            limit_end
        );
        if (!purchases) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        if (purchases.length === 0) {
            res.status(404).json(InfoResponse(404, "No Found"));
            return next();
        }

        res.json({ purchases });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
