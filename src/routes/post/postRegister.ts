import { Request, Response, NextFunction } from "express";
import { userSchemaRegister } from "../../schemas/UsersSch";
import { createUser } from "../../repositories/UsersR";
import { v4 as uuidv4 } from "uuid";
import { hashPass } from "../../utils/hash";
import { InfoResponse } from "../../utils/InfoResponse";

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaRegister.validate(req.body);
    if (error) return next({ error });
    const Body = value as UserPostRegister;
    const hash = await hashPass(Body.password);

    const User = {
        id: uuidv4(),
        ...Body,
        isAdmin: false,
        password: hash,
    };

    try {
        await createUser(User);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
