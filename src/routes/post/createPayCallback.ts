import { Request, Response, NextFunction } from "express";
import { InfoResponse } from "../../utils/InfoResponse";
import { signDataGetGetPayByFlowOrder } from "../../utils/flowApi";
import { updatePurchasesStatus } from "../../repositories/PurchasesR";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const createPayCallback = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { token } = req.body;
    if (!token || typeof token !== "string") {
        return res.status(400).json(InfoResponse(400, "Token is required"));
    }

    const response = await signDataGetGetPayByFlowOrder(token);
    if (!response) {
        return res.status(404).json(InfoResponse(404, "Not found"));
    }

    try {
        const rows = await updatePurchasesStatus(
            response.flowOrder.toString(),
            response.status,
            response.status === 2,
            response.optional.userId,
            response.optional.fk_store
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
