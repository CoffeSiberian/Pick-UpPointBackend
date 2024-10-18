import { Request, Response, NextFunction } from "express";
import { getCategoriesProducts as getCategoriesProductsR } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { validateQueryPagination } from "../../utils/queryValidations";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getCategoriesProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const idCategory = req.query.idcategory;
    const storeId = req.query.storeid;

    if (
        !storeId ||
        typeof storeId !== "string" ||
        !idCategory ||
        typeof idCategory !== "string"
    ) {
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
        const Categories = await getCategoriesProductsR(
            idCategory,
            storeId,
            limit_start,
            limit_end
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
