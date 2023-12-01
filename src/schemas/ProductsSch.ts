import Joi from "joi";
import { Products } from "../types/db/model";

interface ProductsAndStocks extends Products {
    stock: number;
}

export const productSchema = Joi.object<ProductsAndStocks>({
    name: Joi.string().min(1).max(256).required(),
    description: Joi.string().min(1).max(256).required(),
    price: Joi.number().min(0).max(99999999999999999999).required(),
    stock: Joi.number().min(0).max(99999999999999999999).required(),
    fk_category: Joi.string().uuid().required(),
});

export const productUpodateSchemaCustom = Joi.object({
    id: Joi.string().uuid().required(),
    name: Joi.string().min(1).max(256).required(),
    description: Joi.string().min(1).max(256).required(),
    price: Joi.number().min(0).max(99999999999999999999).required(),
    fk_category: Joi.string().uuid().required(),
});

export const productUpdateStockSchemaCustom = Joi.object({
    fk_product: Joi.string().uuid().required(),
    quantity: Joi.number().min(0).max(99999999999999999999).required(),
});

export const buyProcessSchema = Joi.object({
    products: Joi.array()
        .items(
            Joi.object({
                id: Joi.string().uuid().required(),
                quantity: Joi.number().min(1).max(1000).required(),
            })
        )
        .required(),
});
