import { Request, Response, NextFunction } from "express";
import { getAllStorePurchases } from "../../repositories/PurchasesR";
import { InfoResponse } from "../../utils/InfoResponse";

export const getPurchases = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const storeId = req.query.store;
    const limit_start = req.query.limit_start;
    const limit_end = req.query.limit_end;

    if (
        !storeId ||
        typeof storeId !== "string" ||
        !limit_start ||
        typeof limit_start !== "string" ||
        !limit_end ||
        typeof limit_end !== "string"
    ) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const limit_start_number = parseInt(limit_start);
    const limit_end_number = parseInt(limit_end);

    if (isNaN(limit_start_number) || isNaN(limit_end_number)) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const Products = await getAllStorePurchases(
            storeId,
            limit_start_number,
            limit_end_number
        );

        if (!Products) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        if (Products.length === 0) {
            res.status(404).json(InfoResponse(404, "No Found"));
            return next();
        }

        res.json(Products);
        return next();
    } catch (err: any) {
        next({ err });
    }
};
