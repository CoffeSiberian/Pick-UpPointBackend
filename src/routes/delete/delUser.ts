import { Request, NextFunction } from "express";
import { deleteUser } from "../../repositories/UsersR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const delUser = async (
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
        const rows = await deleteUser(id, res.jwtPayload.fk_store);
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "User not found"));
            return next();
        }

        res.status(200).json(InfoResponse(200, "User deleted"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
