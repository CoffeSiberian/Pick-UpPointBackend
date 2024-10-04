import { Request, NextFunction } from "express";
import { updateName } from "../../repositories/UsersR";
import { userSchemaUpdateName } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putUserName = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdateName.validate(req.body);
    if (error) next({ error });
    const User = value as UserUpdateName;

    try {
        const rows = await updateName(res.jwtPayload.id, User.name);
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

interface UserUpdateName {
    name: string;
}
