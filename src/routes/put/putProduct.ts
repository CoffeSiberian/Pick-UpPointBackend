import { Request, NextFunction } from "express";
import { updateProduct } from "../../repositories/ProductsR";
import { productUpodateSchemaCustom } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putProduct = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productUpodateSchemaCustom.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateProduct: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const body = value as ProductUpdate;
    const Product = {
        name: body.name,
        description: body.description,
        price: body.price,
        fk_category: body.fk_category,
    } as ProductPost;

    try {
        const rows = await updateProduct(
            body.id,
            Product,
            body.stock,
            res.jwtPayload.fk_store
        );
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.status(200).json(InfoResponse(200, "Updated"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};

interface ProductUpdate extends ProductPost {
    id: string;
}
