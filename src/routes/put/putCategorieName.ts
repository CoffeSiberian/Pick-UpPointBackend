import { Request, NextFunction } from "express";
import { updateCategoriesName } from "../../repositories/CategoriesR";
import { categoriesSchemaUpdate } from "../../schemas/CategoriesSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";

export const putCategorieName = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = categoriesSchemaUpdate.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateCategorie: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const Categorie = value as CategorieUpdate;

    try {
        const rows = await updateCategoriesName(
            Categorie.id,
            res.jwtPayload.fk_store,
            Categorie.name
        );
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.status(200).json(InfoResponse(200, "Updated"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};

interface CategorieUpdate extends CategoriePost {
    id: string;
    fk_store: string;
}
