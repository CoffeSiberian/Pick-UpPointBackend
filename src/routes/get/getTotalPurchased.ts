import { Request, NextFunction } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import { getTotalStorePurchases } from "../../repositories/PurchasesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";
import Joi from "joi";

const totalPurchaseSchema = Joi.object({
    date_start: Joi.date().required(),
    date_end: Joi.date().required(),
});

export const getTotalPurchased = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = totalPurchaseSchema.validate(req.query);
    if (error) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const { date_start, date_end } = value as {
        date_start: string;
        date_end: string;
    };

    try {
        const purchases = await getTotalStorePurchases(
            res.jwtPayload.fk_store,
            date_start,
            date_end
        );

        if (!purchases || purchases.total_money === null) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json({ purchases });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
