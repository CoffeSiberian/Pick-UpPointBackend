import { Request, NextFunction } from "express";
import { updateStock } from "../../repositories/ProductsR";
import { productUpdateStockSchemaCustom } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";

export const putProductStock = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productUpdateStockSchemaCustom.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateProductStock: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const body = value as StockCustomUpdate;

    try {
        const rows = await updateStock(
            body.fk_product,
            body.quantity,
            res.jwtPayload.fk_store
        );
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

interface StockCustomUpdate {
    fk_product: string;
    quantity: number;
}
