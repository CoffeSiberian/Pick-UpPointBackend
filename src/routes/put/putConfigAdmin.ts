import { Request, NextFunction } from "express";
import { updateConfigsAdmin } from "../../repositories/ConfigsR";
import { configsSchemaUpdateAdmin } from "../../schemas/ConfigsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const putConfigAdmin = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configsSchemaUpdateAdmin.validate(req.body);
    if (error) next({ error });
    const Config = value as ConfingUpdateAdmin;

    try {
        const rows = await updateConfigsAdmin(
            res.jwtPayload.fk_store,
            Config.adminname,
            Config.adminemail,
            Config.adminpassword
        );
        if (rows === 0) {
            res.status(404).json(InfoResponse(404, "Not Found"));
            return next();
        }
        res.status(200).json(InfoResponse(200, "Updated"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};

interface ConfingUpdateAdmin {
    adminname: string;
    adminemail: string;
    adminpassword: string;
}
