import { Request, NextFunction } from "express";
import {
    updateUserProfile,
    updateUserProfileWhitoutPassword,
} from "../../repositories/UsersR";
import { hashPass } from "../../utils/hash";
import { userSchemaUpdateUser } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const putUserProfile = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdateUser.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateProfile: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const User = value as UserPostProfileOptionalPassword;

    try {
        let rows: number;
        if (User.password) {
            rows = await updateUserProfile(
                res.jwtPayload.id,
                User.name,
                User.email,
                await hashPass(User.password)
            );
        } else {
            rows = await updateUserProfileWhitoutPassword(
                res.jwtPayload.id,
                User.name,
                User.email
            );
        }

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
