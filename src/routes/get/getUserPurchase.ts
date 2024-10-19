import { Request, NextFunction } from "express";
import { getPurchasesById } from "../../repositories/PurchasesR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getUserPurchase = async (
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
        const Purchase = await getPurchasesById(id, res.jwtPayload.id);
        if (!Purchase) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json(Purchase);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
