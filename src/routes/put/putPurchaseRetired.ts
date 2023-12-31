import { Request, NextFunction } from "express";
import { updatePurchasesRetired } from "../../repositories/PurchasesR";
import { PurchaseRetiredUpdateSchema } from "../../schemas/Purchases_ItemsSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const putPurchaseRetired = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = PurchaseRetiredUpdateSchema.validate(req.body);
    if (error) return next({ error });
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
        next({ err });
    }
};

interface PurchaseUpdate {
    id: string;
    retired: boolean;
    fk_user: string;
}
