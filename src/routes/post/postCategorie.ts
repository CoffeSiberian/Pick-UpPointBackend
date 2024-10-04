import { Request, NextFunction } from "express";
import { categoriesSchema } from "../../schemas/CategoriesSch";
import { createCategories } from "../../repositories/CategoriesR";
import { v4 as uuidv4 } from "uuid";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const postCategorie = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = categoriesSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`validCreateCategorie: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const Bode = value as CategoriePost;
    const Categorie = {
        id: uuidv4(),
        ...Bode,
        fk_store: res.jwtPayload.fk_store,
    };

    try {
        await createCategories(Categorie);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
