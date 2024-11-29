import Joi from "joi";
import { Images_Products } from "../types/db/model";

export const ImagesProductsSchema = Joi.object<Images_Products>({
    file_name: Joi.string().min(1).max(256).required(),
    fk_products: Joi.string().uuid().required(),
});
