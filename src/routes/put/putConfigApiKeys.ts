import { Request, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { updateConfigsApiKeys } from "../../repositories/ConfigsR";
import { configSchemaUpdateApiKeys } from "../../schemas/ConfigsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putConfigApiKeys = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = configSchemaUpdateApiKeys.validate(req.body);

    if (error) {
        dbErrors(error as unknown as ValidationError, res);
        return next();
    }

    const Config = value as ConfingUpdateApiKeys;

    try {
        const rows = await updateConfigsApiKeys(
            res.jwtPayload.fk_store,
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
        dbErrors(err, res);
        next();
    }
};

interface ConfingUpdateApiKeys {
    api_key_public: string;
    api_key_private: string;
}
