import Joi from "joi";
import { Configs } from "../types/db/model";

export const configSchema = Joi.object<Configs>({
    payment_method: Joi.string().min(1).max(256).allow(null).required(),
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
    logo: Joi.string().min(1).max(256).required(),
});

export const configsSchemaUpdate = Joi.object<Configs>({
    payment_method: Joi.string().min(1).max(256).allow(null).required(),
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
    logo: Joi.string().min(1).max(256).required(),
});

export const configSchemaUpdateApiKeys = Joi.object<Configs>({
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
});
