import Joi from "joi";
import { Purchases_Items } from "../types/db/model";
import { Purchases } from "../types/db/model";

interface Purchases_ItemsMany {
    items: Purchases_Items[];
}

export const PurchasesItemsManySchema = Joi.object<Purchases_ItemsMany>({
    items: Joi.array().items(
        Joi.object<Purchases_Items>({
            quantity: Joi.number().integer().min(1).required(),
            fk_product: Joi.string().uuid().required(),
            fk_purchase: Joi.string().uuid().required(),
        })
    ),
});

export const PurchaseStatusUpdateSchema = Joi.object<Purchases>({
    id: Joi.string().uuid().required(),
    status: Joi.string()
        .valid("pending", "paid", "canceled", "retired")
        .required(),
    fk_user: Joi.string().uuid().required(),
});

export const PurchaseRetiredUpdateSchema = Joi.object<Purchases>({
    id: Joi.string().uuid().required(),
    retired: Joi.boolean().required(),
    fk_user: Joi.string().uuid().required(),
});
