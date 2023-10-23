import Joi from "joi";
import { Users } from "../types/db/model";

export const userSchema = Joi.object<Users>({
    rut: Joi.string().min(1).max(15).required(),
    name: Joi.string().min(1).max(256).required(),
    email: Joi.string().min(1).max(256).required(),
    password: Joi.string().min(1).max(60).required(),
    fk_store: Joi.string().uuid().required(),
});

export const userSchemaUpdate = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    rut: Joi.string().min(1).max(15).optional(),
    name: Joi.string().min(1).max(256).optional(),
    email: Joi.string().min(1).max(256).optional(),
    password: Joi.string().min(1).max(60).optional(),
    fk_store: Joi.string().uuid().optional(),
});

export const userSchemaUpdatePass = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    password: Joi.string().min(1).max(60).required(),
});

export const userSchemaUpdateName = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(1).max(256).required(),
});

export const userSchemaUpdateEmail = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    email: Joi.string().min(1).max(256).required(),
});
