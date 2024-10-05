import { Request, NextFunction } from "express";
import { ValidationError } from "sequelize";
import { updateEmail } from "../../repositories/UsersR";
import { userSchemaUpdateEmail } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putUserEmail = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdateEmail.validate(req.body);
    if (error) {
        dbErrors(error as unknown as ValidationError, res);
        return next();
    }
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
        dbErrors(err, res);
        next();
    }
};

interface UserUpdateEmail {
    email: string;
}
