import Joi from "joi";
import { Categories } from "../types/db/model";

export const CategoriesSchema = Joi.object<Categories>({
    name: Joi.string().min(1).max(256).required(),
    fk_store: Joi.string().uuid().required(),
});
