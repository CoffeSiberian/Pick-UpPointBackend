import { Request, Response, NextFunction } from "express";
import { getProduct as getProductR } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const id = req.query.id;
    if (!id || typeof id !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }

    try {
        const Product = await getProductR(id);
        if (!Product) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.json(Product);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
