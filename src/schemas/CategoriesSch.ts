import Joi from "joi";
import { Categories } from "../types/db/model";

export const categoriesSchema = Joi.object<Categories>({
    name: Joi.string().min(1).max(256).required(),
});

export const categoriesSchemaUpdate = Joi.object<Categories>({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(1).max(256),
    fk_store: Joi.string().uuid(),
});
