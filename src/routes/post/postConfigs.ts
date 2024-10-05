import { Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "sequelize";
import { InfoResponse } from "../../utils/InfoResponse";
import { createConfigs } from "../../repositories/ConfigsR";
import { configSchema } from "../../schemas/ConfigsSch";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const postConfigs = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configSchema.validate(req.body);

    if (error) {
        dbErrors(error as unknown as ValidationError, res);
        return next();
    }

    const body = value as ConfigPost;
    const Config = { id: uuidv4(), ...body, fk_store: res.jwtPayload.fk_store };

    try {
        await createConfigs(Config);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
