import { Request, NextFunction } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

export const createPayCallback = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    console.log(req.body);
    res.status(200).json({ message: "ok" });
};
