import { Request, Response, NextFunction } from "express";
import { updateName } from "../../repositories/UsersR";
import { userSchemaUpdateName } from "../../schemas/UsersSch";
import { InfoResponse } from "../../utils/InfoResponse";

export const putUserName = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { error, value } = userSchemaUpdateName.validate(req.body);
    if (error) next({ error });
    const User = value as UserUpdateName;

    try {
        const rows = await updateName(User.id, User.name);
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

interface UserUpdateName {
    id: string;
    name: string;
}
