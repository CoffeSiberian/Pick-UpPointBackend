import { Request, NextFunction } from "express";
import { deleteProductImage } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const delProductImage = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;
    const fk_product = req.query.fk_product;

    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    if (!fk_product || typeof fk_product !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const rows = await deleteProductImage(
            id,
            fk_product,
            res.jwtPayload.fk_store
        );
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Product image not found"));
            return next();
        }

        res.status(200).json(InfoResponse(200, "Product image deleted"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
