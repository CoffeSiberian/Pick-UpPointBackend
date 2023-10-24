import { createConfigs } from "../../repositories/ConfigsR";
import { configSchema } from "../../schemas/ConfigsSch";
import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export const postConfigs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configSchema.validate(req.body);
    if (error) next({ error });
    const body = value as ConfigPost;
    const Config = { id: uuidv4(), ...body };

    try {
        const configs = await createConfigs(Config);
        res.json(configs);
        return next();
    } catch (err: any) {
        next({ err });
    }
};
