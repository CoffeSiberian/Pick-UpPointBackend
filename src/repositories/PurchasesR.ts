import Purchases from "../models/Purchases";
import { Purchases as PurchasesTypes } from "../types/db/model";

// GET
export const getPurchases = async (fk_user: string): Promise<Purchases[]> => {
    return await Purchases.findAll({
        where: { fk_user },
    });
};

export const getPurchasesById = async (
    id: string,
    fk_user: string
): Promise<Purchases | null> => {
    return await Purchases.findOne({
        where: { id, fk_user },
    });
};

// POST
export const createPurchases = async (
    purchases: PurchasesTypes
): Promise<Purchases> => {
    return await Purchases.create(purchases);
};

// PUT
export const updatePayment = async (
    id: string,
    payment_id: string,
    payment_successful: boolean
): Promise<number> => {
    const rows = await Purchases.update(
        { payment_id, payment_successful },
        { where: { id } }
    );
    return rows[0];
};

export const updateRetired = async (
    id: string,
    retired: boolean
): Promise<number> => {
    const rows = await Purchases.update({ retired }, { where: { id } });
    return rows[0];
};

export const updateStatus = async (
    id: string,
    status: string
): Promise<number> => {
    const rows = await Purchases.update({ status }, { where: { id } });
    return rows[0];
};

// DELETE
export const deletePurchases = async (id: string): Promise<number> => {
    const rows = await Purchases.destroy({
        where: { id },
    });
    return rows;
};
