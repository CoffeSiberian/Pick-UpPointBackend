import Joi from "joi";

export const loginAdminSchema = Joi.object<LoginAdmin>({
    username: Joi.string().uuid().required(),
    password: Joi.string().required(),
    fk_store: Joi.string().uuid().required(),
});

export const loginUserSchema = Joi.object<LoginUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fk_store: Joi.string().uuid().required(),
});
