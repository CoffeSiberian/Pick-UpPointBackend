import Joi from "joi";
import { Users } from "../types/db/model";

export const userSchema = Joi.object<Users>({
    rut: Joi.string().min(1).max(15).allow(null).required(),
    name: Joi.string().min(1).max(256).allow(null).required(),
    email: Joi.string().min(1).max(256).allow(null).required(),
    password: Joi.string().min(1).max(60).allow(null).required(),
    fk_store: Joi.string().uuid().allow(null).required(),
});
