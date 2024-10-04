import { Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createProduct } from "../../repositories/ProductsR";
import { createStock } from "../../repositories/StocksR";
import { productSchema } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

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
    const Product = {
        id: productId,
        name: body.name,
        description: body.description,
        price: body.price,
        fk_category: body.fk_category,
    };

    const Stock = {
        id: uuidv4(),
        quantity: body.stock,
        fk_store: res.jwtPayload.fk_store,
        fk_product: productId,
    };

    try {
        await createProduct(Product, res.jwtPayload.fk_store);
        await createStock(Stock);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
