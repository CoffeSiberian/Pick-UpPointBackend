import { Request, NextFunction } from "express";
import { updateConfigs } from "../../repositories/ConfigsR";
import { configsSchemaUpdate } from "../../schemas/ConfigsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const putConfig = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configsSchemaUpdate.validate(req.body);
    if (error) next({ error });
    const Configs = value as ConfigUpdate;

    try {
        const rows = await updateConfigs({
            ...Configs,
            fk_store: res.jwtPayload.fk_store,
        });
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

interface ConfigUpdate extends ConfigPost {
    id: string;
}
