import Joi from "joi";
import { Users } from "../types/db/model";

export const userSchema = Joi.object<Users>({
    rut: Joi.string().min(1).max(15).required(),
    name: Joi.string().min(1).max(256).required(),
    email: Joi.string().min(1).max(256).required(),
    password: Joi.string().min(1).max(60).required(),
});

export const userSchemaUpdate = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    rut: Joi.string().min(1).max(15).optional(),
    name: Joi.string().min(1).max(256).optional(),
    email: Joi.string().min(1).max(256).optional(),
    password: Joi.string().min(1).max(60).optional(),
});

export const userSchemaUpdatePass = Joi.object<Users>({
    password: Joi.string().min(1).max(60).required(),
});

export const userSchemaUpdateName = Joi.object<Users>({
    name: Joi.string().min(1).max(256).required(),
});

export const userSchemaUpdateEmail = Joi.object<Users>({
    email: Joi.string().min(1).max(256).required(),
});
