import { Request, Response, NextFunction } from "express";
import { getAllStoreProducts as getAllStoreProductsR } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { validateQueryPagination } from "../../utils/queryValidations";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const storeId = req.query.store;

    if (!storeId || typeof storeId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const queryDataPagination = validateQueryPagination(req);
    if (!queryDataPagination) {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    const { limit_start, limit_end } = queryDataPagination;

    try {
        const products = await getAllStoreProductsR(
            storeId,
            limit_start,
            limit_end
        );

        if (!products) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        if (products.length === 0) {
            res.status(404).json(InfoResponse(404, "No Found"));
            return next();
        }

        res.json({ products });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
