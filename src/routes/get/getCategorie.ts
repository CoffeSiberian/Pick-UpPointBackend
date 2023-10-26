import { Request, Response, NextFunction } from "express";
import { getCategorie as getCategorieR } from "../../repositories/CategoriesR";
import { InfoResponse } from "../../utils/InfoResponse";

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
        const Users = await getCategorieR(CategorieId, storeId);
        if (!Users) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.json(Users);
        return next();
    } catch (err: any) {
        next({ err });
    }
};
