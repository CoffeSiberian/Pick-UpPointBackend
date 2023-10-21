import { Request, NextFunction } from "express";
import { createJWT } from "../../utils/jwt";
import { ResponsePass } from "../../types/ResponseExtends";

export const getJwt = async (
    req: Request,
    res: ResponsePass,
    next: NextFunction
): Promise<any> => {
    const jwt = await createJWT({
        id: res.locals.id,
        isAdmin: res.locals.isAdmin,
        fk_store: res.locals.fk_store,
    });
    res.status(200).json({ jwt });
    return next();
};
