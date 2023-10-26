import { Request, Response, NextFunction } from "express";
import { deleteCategorie } from "../../repositories/CategoriesR";
import { InfoResponse } from "../../utils/InfoResponse";

export const delCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;
    const fk_store = req.query.fk_store;
    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }
    if (!fk_store || typeof fk_store !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const rows = await deleteCategorie(id, fk_store);
        res.json({ rows });
        return next();
    } catch (err: any) {
        next({ err });
    }
};
