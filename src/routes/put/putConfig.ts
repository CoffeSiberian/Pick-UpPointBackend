import { Request, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { updateConfigs } from "../../repositories/ConfigsR";
import { configsSchemaUpdate } from "../../schemas/ConfigsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putConfig = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configsSchemaUpdate.validate(req.body);

    if (error) {
        dbErrors(error as unknown as ValidationError, res);
        return next();
    }

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
        dbErrors(err, res);
        next();
    }
};

interface ConfigUpdate extends ConfigPost {
    id: string;
}
