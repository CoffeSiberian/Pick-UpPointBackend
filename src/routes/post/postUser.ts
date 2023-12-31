import { Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../repositories/UsersR";
import { hashPass } from "../../utils/hash";
import { userSchema } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { logErrorSchemas } from "../../utils/logger";

export const postUser = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        logErrorSchemas(`validUpdateNameUser: ${error.details[0].message}`);
        return res.status(400).json(InfoResponse(400, "Bad Request"));
    }

    const body = value as UserPost;
    const passHash = await hashPass(body.password);
    const User = {
        id: uuidv4(),
        ...body,
        isAdmin: false,
        password: passHash,
        fk_store: res.jwtPayload.fk_store,
    };

    try {
        await createUser(User);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
