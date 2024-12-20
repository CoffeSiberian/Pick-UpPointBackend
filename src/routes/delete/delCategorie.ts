import { Request, NextFunction } from "express";
import { deleteCategorie } from "../../repositories/CategoriesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const delCategorie = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;
    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const rows = await deleteCategorie(id, res.jwtPayload.fk_store);
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Categorie not found"));
            return next();
        }

        res.status(200).json(InfoResponse(200, "Categorie deleted"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
