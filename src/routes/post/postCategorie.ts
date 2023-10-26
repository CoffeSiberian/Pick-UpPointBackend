import { Request, Response, NextFunction } from "express";
import { CategoriesSchema } from "../../schemas/CategoriesSch";
import { createCategories } from "../../repositories/CategoriesR";
import { v4 as uuidv4 } from "uuid";
import { InfoResponse } from "../../utils/InfoResponse";

export const postCategorie = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = CategoriesSchema.validate(req.body);
    if (error) next({ error });
    const Bode = value as CategoriePost;
    const Categorie = { id: uuidv4(), ...Bode };

    try {
        const rows = await createCategories(Categorie);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
