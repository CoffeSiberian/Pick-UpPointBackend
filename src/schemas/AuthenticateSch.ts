import Joi from "joi";

export const loginUserSchema = Joi.object<LoginUser>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fk_store: Joi.string().uuid().required(),
});
