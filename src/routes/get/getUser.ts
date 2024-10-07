import { Request, NextFunction } from "express";
import { getUser as getUserR } from "../../repositories/UsersR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const getUser = async (
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
        const user = await getUserR(id, res.jwtPayload.fk_store);
        if (!user) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }

        res.json(user);
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
