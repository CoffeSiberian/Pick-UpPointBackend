import { Request, Response, NextFunction } from "express";
import { updateUser } from "../../repositories/UsersR";
import { hashPass } from "../../utils/hash";
import { userSchemaUpdate } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";

export const putUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdate.validate(req.body);
    if (error) next({ error });
    const User = value as UserUpdate;
    const UserPassHash = await hashPass(User.password);

    try {
        const rows = await updateUser({ ...User, password: UserPassHash });
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

interface UserUpdate extends UserPost {
    id: string;
}
