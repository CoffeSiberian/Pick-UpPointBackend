import Purchases_Items from "../models/Purchases_Items";
import { Purchases_Items as Purchases_ItemsTypes } from "../types/db/model";

// GET
export const getPurchases_Items = async (
    fk_purchase: string
): Promise<Purchases_Items[]> => {
    return await Purchases_Items.findAll({
        where: { fk_purchase },
    });
};

export const getPurchases_ItemsById = async (
    id: string,
    fk_purchase: string
): Promise<Purchases_Items | null> => {
    return await Purchases_Items.findOne({
        where: { id, fk_purchase },
    });
};

// POST
export const createPurchases_ItemsMany = async (
    purchases_items: Purchases_ItemsTypes[]
): Promise<Purchases_Items[]> => {
    return await Purchases_Items.bulkCreate(purchases_items);
};

// PUT
export const updatePurchases_Items = async (
    id: string,
    purchases_items: Purchases_ItemsTypes
): Promise<number> => {
    const rows = await Purchases_Items.update(purchases_items, {
        where: { id },
    });
    return rows[0];
};
