import { Request, Response, NextFunction } from "express";
import { userSchemaRegister } from "../../schemas/UsersSch";
import { createUser } from "../../repositories/UsersR";
import { hashPass } from "../../utils/hash";
import { InfoResponse } from "../../utils/InfoResponse";
import { logErrorSchemas } from "../../utils/logger";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaRegister.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateNameUser: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }
    const body = value as UserPostRegister;
    const hash = await hashPass(body.password);

    const User = {
        ...body,
        isAdmin: false,
        password: hash,
    };

    try {
        await createUser(User);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};
