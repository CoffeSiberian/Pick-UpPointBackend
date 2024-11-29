import { Request, NextFunction } from "express";
import { updatePrimaryImage } from "../../repositories/ProductsR";
import { productImageSchema } from "../../schemas/ProductsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putPrimaryImage = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = productImageSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateProductImage: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const body = value as ProductUpdate;

    try {
        const rows = await updatePrimaryImage(
            body.id,
            body.fk_image,
            res.jwtPayload.fk_store
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

interface ProductUpdate {
    id: string;
    fk_image: string;
}
