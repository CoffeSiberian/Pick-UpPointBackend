import { Request, NextFunction } from "express";
import { createProductWithStock } from "../../repositories/ProductsR";
import { productSchema } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

// Need Refactor
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
    const Product = {
        name: body.name,
        description: body.description,
        price: body.price,
        fk_category: body.fk_category,
    };

    try {
        await createProductWithStock(
            Product,
            body.stock,
            res.jwtPayload.fk_store
        );
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
