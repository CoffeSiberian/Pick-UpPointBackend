import { Request, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { updatePurchasesRetired } from "../../repositories/PurchasesR";
import { PurchaseRetiredUpdateSchema } from "../../schemas/Purchases_ItemsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putPurchaseRetired = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = PurchaseRetiredUpdateSchema.validate(req.body);

    if (error) {
        dbErrors(error as unknown as ValidationError, res);
        return next();
    }

    const body = value as PurchaseUpdate;

    try {
        const rows = await updatePurchasesRetired(
            body.id,
            body.retired,
            body.fk_user,
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

interface PurchaseUpdate {
    id: string;
    retired: boolean;
    fk_user: string;
}
