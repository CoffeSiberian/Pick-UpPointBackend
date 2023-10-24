import Joi from "joi";
import { Configs } from "../types/db/model";

export const configSchema = Joi.object<Configs>({
    payment_method: Joi.string().min(1).max(256).allow(null).required(),
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
    logo: Joi.string().min(1).max(256).required(),
    adminname: Joi.string().min(1).max(256).required(),
    adminemail: Joi.string().min(1).max(256).required(),
    adminpassword: Joi.string().min(1).max(256).required(),
    fk_store: Joi.string().uuid().allow(null).required(),
});

export const configsSchemaUpdate = Joi.object<Configs>({
    fk_store: Joi.string().uuid().required(),
    payment_method: Joi.string().min(1).max(256).allow(null).required(),
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
    logo: Joi.string().min(1).max(256).required(),
    adminname: Joi.string().min(1).max(256).required(),
    adminemail: Joi.string().min(1).max(256).required(),
    adminpassword: Joi.string().min(1).max(256).required(),
});

export const configSchemaUpdateApiKeys = Joi.object<Configs>({
    api_key_public: Joi.string().min(1).max(256).allow(null).required(),
    api_key_private: Joi.string().min(1).max(256).allow(null).required(),
    fk_store: Joi.string().uuid().required(),
});

export const configsSchemaUpdateAdmin = Joi.object<Configs>({
    adminname: Joi.string().min(1).max(256).required(),
    adminemail: Joi.string().min(1).max(256).required(),
    adminpassword: Joi.string().min(1).max(256).required(),
    fk_store: Joi.string().uuid().required(),
});

export const configSchemaUpdateLogo = Joi.object<Configs>({
    fk_store: Joi.string().uuid().required(),
});
