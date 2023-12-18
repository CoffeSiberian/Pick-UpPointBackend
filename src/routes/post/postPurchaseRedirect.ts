import { Request, Response, NextFunction } from "express";
import { WEB_URL } from "../../utils/configs";
import { InfoResponse } from "../../utils/InfoResponse";

export const postPurchaseRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const payId = req.query.id;
    if (!payId || typeof payId !== "string") {
        res.status(400).json(InfoResponse(400, "Bad Request"));
        return next();
    }
    res.redirect(`${WEB_URL}/${payId}`);
};
