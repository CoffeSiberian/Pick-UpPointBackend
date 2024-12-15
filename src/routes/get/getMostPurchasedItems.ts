import { Request, NextFunction } from "express";
import Joi from "joi";
import { ResponseJwt } from "../../types/ResponseExtends";
import { getMostPurchasedItems as getMostPurchasedItemsR } from "../../repositories/Purchases_ItemsR";
import { dbErrors } from "../../middlewares/errorMiddleware";
import { InfoResponse } from "../../utils/InfoResponse";

const totalPurchaseSchema = Joi.object({
    date_start: Joi.date().required(),
    date_end: Joi.date().required(),
});

export const getMostPurchasedItems = async (
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
        const items = await getMostPurchasedItemsR(
            res.jwtPayload.fk_store,
            date_start,
            date_end
        );

        if (items.length === 0) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json({
            most_purchased_items: items.slice(0, 5),
        });
        return next();
    } catch (err: any) {
        console.log(err);
        dbErrors(err, res);
        next();
    }
};
