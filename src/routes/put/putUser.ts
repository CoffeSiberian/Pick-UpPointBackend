import { Request, NextFunction } from "express";
import { updateUser } from "../../repositories/UsersR";
import { hashPass } from "../../utils/hash";
import { userSchemaUpdate } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putUser = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdate.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateNameUser: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const User = value as UserUpdate;
    const UserPassHash = await hashPass(User.password);

    try {
        const rows = await updateUser({
            ...User,
            password: UserPassHash,
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

interface UserUpdate extends UserPost {
    id: string;
    isAdmin: boolean;
}
