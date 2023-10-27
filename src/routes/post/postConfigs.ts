import { Request, NextFunction } from "express";
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
        const configs = await createConfigs(Config);
        res.json(configs);
        return next();
    } catch (err: any) {
        next({ err });
    }
};
