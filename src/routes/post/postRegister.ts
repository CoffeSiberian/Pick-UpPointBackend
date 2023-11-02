import { Request, Response, NextFunction } from "express";
import { userSchema } from "../../schemas/UsersSch";
import { createUser } from "../../repositories/UsersR";
import { v4 as uuidv4 } from "uuid";
import { hashPass } from "../../utils/hash";
import { InfoResponse } from "../../utils/InfoResponse";

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchema.validate(req.body);
    if (error) return next({ error });
    const Bode = value as UserPostRegister;
    const Categorie = {
        id: uuidv4(),
        ...Bode,
        password: await hashPass(Bode.password),
    };

    try {
        await createUser(Categorie);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};
