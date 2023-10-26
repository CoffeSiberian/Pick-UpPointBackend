import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "../../repositories/ProductsR";
import { productSchema } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";

export const postProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productSchema.validate(req.body);
    if (error) return next({ error });
    const body = value as ProductPost;
    const Product = { id: uuidv4(), ...body };

    try {
        await createProduct(Product);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
