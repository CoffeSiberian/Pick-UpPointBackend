import { Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "../../repositories/ProductsR";
import { productSchema } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";

export const postProduct = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`validCreateProduct: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const body = value as ProductPost;
    const Product = { id: uuidv4(), ...body };

    try {
        await createProduct(Product, res.jwtPayload.fk_store);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
