import { Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "../../repositories/ProductsR";
import { createStock } from "../../repositories/StocksR";
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
    const productId = uuidv4();
    const Product = { id: productId, ...body };
    const Stock = {
        id: uuidv4(),
        quantity: 0,
        fk_store: res.jwtPayload.fk_store,
        fk_product: productId,
    };

    try {
        await createProduct(Product, res.jwtPayload.fk_store);
        await createStock(Stock);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
