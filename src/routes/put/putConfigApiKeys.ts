import { Request, Response, NextFunction } from "express";
import { updateConfigsApiKeys } from "../../repositories/ConfigsR";
import { configSchemaUpdateApiKeys } from "../../schemas/ConfigsSch";
import { InfoResponse } from "../../utils/InfoResponse";

export const putConfigApiKeys = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configSchemaUpdateApiKeys.validate(req.body);
    if (error) next({ error });
    const Config = value as ConfingUpdateApiKeys;

    try {
        const rows = await updateConfigsApiKeys(
            Config.fk_store,
            Config.api_key_private,
            Config.api_key_public
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

interface ConfingUpdateApiKeys {
    api_key_public: string;
    api_key_private: string;
    fk_store: string;
}
