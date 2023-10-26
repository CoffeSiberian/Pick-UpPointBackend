import { Request, Response, NextFunction } from "express";
import { updateProduct } from "../../repositories/ProductsR";
import { productUpodateSchemaCustom } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";

export const putProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productUpodateSchemaCustom.validate(req.body);
    if (error) return next({ error });

    const body = value as ProductUpdate;
    const Product = {
        name: body.name,
        description: body.description,
        price: body.price,
        fk_category: body.fk_category,
    } as ProductPost;

    try {
        const rows = await updateProduct(body.id, Product);
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

interface ProductUpdate extends ProductPost {
    id: string;
    fk_store: string;
}
