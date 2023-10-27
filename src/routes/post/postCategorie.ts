import { Request, NextFunction } from "express";
import { categoriesSchema } from "../../schemas/CategoriesSch";
import { createCategories } from "../../repositories/CategoriesR";
import { v4 as uuidv4 } from "uuid";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const postCategorie = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = categoriesSchema.validate(req.body);
    if (error) return next({ error });
    const Bode = value as CategoriePost;
    const Categorie = {
        id: uuidv4(),
        ...Bode,
        fk_store: res.jwtPayload.fk_store,
    };

    try {
        const rows = await createCategories(Categorie);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
