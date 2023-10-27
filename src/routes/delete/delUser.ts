import { Request, NextFunction } from "express";
import { deleteUser } from "../../repositories/UsersR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const delSelectOption = async (
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
        res.json({ rows });
        return next();
    } catch (err: any) {
        next({ err });
    }
};
