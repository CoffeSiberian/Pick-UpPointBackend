import { Request, Response, NextFunction } from "express";
import { InfoResponse } from "../../utils/InfoResponse";
import { signDataGetGetPayByFlowOrder } from "../../utils/flowApi";

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

    res.status(200).json(InfoResponse(200, "Ok"));
    return next();
};
