import { Request, NextFunction } from "express";
import { InfoResponse } from "../../utils/InfoResponse";
import { createConfigs } from "../../repositories/ConfigsR";
import { configSchema } from "../../schemas/ConfigsSch";
import { v4 as uuidv4 } from "uuid";
import { ResponseJwt } from "../../types/ResponseExtends";

export const postConfigs = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configSchema.validate(req.body);
    if (error) return next({ error });
    const body = value as ConfigPost;
    const Config = { id: uuidv4(), ...body, fk_store: res.jwtPayload.fk_store };

    try {
        await createConfigs(Config);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
