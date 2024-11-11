import Joi from "joi";
import { Users } from "../types/db/model";

export const userSchema = Joi.object<Users>({
    rut: Joi.string().min(5).max(15).required(),
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().min(1).max(256).required(),
    password: Joi.string().min(5).max(60).required(),
});

export const userSchemaRegister = Joi.object<Users>({
    rut: Joi.string().min(5).max(15).required(),
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().min(1).max(256).required(),
    password: Joi.string().min(1).max(60).required(),
    fk_store: Joi.string().uuid().required(),
});

export const userSchemaUpdate = Joi.object<Users>({
    id: Joi.string().uuid().required(),
    rut: Joi.string().min(5).max(15).required(),
    name: Joi.string().min(3).max(256).required(),
    email: Joi.string().email().min(1).max(256).required(),
    isAdmin: Joi.boolean().required(),
    password: Joi.string().min(5).max(50),
});

export const userSchemaUpdatePass = Joi.object<Users>({
    password: Joi.string().min(5).max(50).required(),
});

export const userSchemaUpdateName = Joi.object<Users>({
    name: Joi.string().min(3).max(256).required(),
});

export const userSchemaUpdateEmail = Joi.object<Users>({
    email: Joi.string().email().min(1).max(256).required(),
});
