import { Request, Response, NextFunction } from "express";
import { getAllCategories as getAllCategoriesR } from "../../repositories/CategoriesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const storeId = req.query.store;
    if (!storeId || typeof storeId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const categories = await getAllCategoriesR(storeId);
        if (!categories) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json({ categories });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
