import { Request, NextFunction } from "express";
import { getAllItemsPurchasedProfile as getAllItemsPurchasedR } from "../../repositories/Purchases_ItemsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getAllItemsPurchasedProfile = async (
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
        const itemsPurchased = await getAllItemsPurchasedR(
            id,
            res.jwtPayload.fk_store,
            res.jwtPayload.id
        );
        if (!itemsPurchased) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json({ itemsPurchased });
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
