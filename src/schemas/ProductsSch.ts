import Joi from "joi";
import { Products } from "../types/db/model";

export const productSchema = Joi.object<Products>({
    name: Joi.string().min(1).max(256).required(),
    description: Joi.string().min(1).max(256).required(),
    price: Joi.number().min(0).max(99999999999999999999).required(),
    fk_category: Joi.string().uuid().required(),
});
