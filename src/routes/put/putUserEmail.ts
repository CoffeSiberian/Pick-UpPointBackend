import { Request, NextFunction } from "express";
import { updateEmail } from "../../repositories/UsersR";
import { userSchemaUpdateEmail } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";

export const putUserEmail = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdateEmail.validate(req.body);
    if (error) next({ error });
    const User = value as UserUpdateEmail;

    try {
        const rows = await updateEmail(res.jwtPayload.id, User.email);
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

interface UserUpdateEmail {
    email: string;
}
