import { Request, Response, NextFunction } from "express";
import { getCategoriesProducts as getCategoriesProductsR } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getCategoriesProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const idCategory = req.query.idcategory;
    const storeId = req.query.storeid;
    const limit_start = req.query.limit_start;
    const limit_end = req.query.limit_end;

    if (
        !storeId ||
        typeof storeId !== "string" ||
        !limit_start ||
        typeof limit_start !== "string" ||
        !limit_end ||
        typeof limit_end !== "string" ||
        !idCategory ||
        typeof idCategory !== "string"
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
        const Categories = await getCategoriesProductsR(
            idCategory,
            storeId,
            limit_start_number,
            limit_end_number
        );

        if (!Categories) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json(Categories);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
