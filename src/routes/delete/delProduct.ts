import { Request, NextFunction } from "express";
import { deleteProduct } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const delProduct = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;
    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const rows = await deleteProduct(id, res.jwtPayload.fk_store);
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Product not found"));
            return next();
        }

        return next();
    } catch (err: any) {
        next({ err });
    }
};
