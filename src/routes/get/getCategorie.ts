import { Request, Response, NextFunction } from "express";
import { getCategorie as getCategorieR } from "../../repositories/CategoriesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const storeId = req.query.store;
    const CategorieId = req.query.categorie;
    if (!storeId || typeof storeId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }
    if (!CategorieId || typeof CategorieId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const Categories = await getCategorieR(CategorieId, storeId);
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
