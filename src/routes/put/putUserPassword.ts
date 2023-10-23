import { Request, Response, NextFunction } from "express";
import { updatePassword } from "../../repositories/UsersR";
import { userSchemaUpdatePass } from "../../schemas/UsersSch";
import { hashPass } from "../../utils/hash";
import { InfoResponse } from "../../utils/InfoResponse";

export const putUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdatePass.validate(req.body);
    if (error) next({ error });
    const User = value as UserUpdatePass;
    const hash = await hashPass(User.password);

    try {
        const rows = await updatePassword(User.id, hash);
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

interface UserUpdatePass {
    id: string;
    password: string;
}
