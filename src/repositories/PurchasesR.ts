import { sequelize } from "../models/database";
import Purchases from "../models/Purchases";
import Purchases_Items from "../models/Purchases_Items";
import { getUser } from "./UsersR";
import { Purchases_Items as Purchases_ItemsTypes } from "../types/db/model";
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

export const getPurchasesByOnlyId = async (
    id: string
): Promise<Purchases | null> => {
    return await Purchases.findOne({ where: { id } });
};

// POST
export const createPurchases = async (
    purchases: PurchasesTypes
): Promise<Purchases> => {
    return await Purchases.create(purchases);
};

export const createPurchasesWithItems = async (
    purchases: PurchasesTypes,
    items: Purchases_ItemsTypes[]
): Promise<Purchases> => {
    const t = await sequelize.transaction();
    try {
        const purchase = await Purchases.create(purchases, { transaction: t });
        await Purchases_Items.bulkCreate(items, { transaction: t });
        await t.commit();
        return purchase;
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

// PUT
export const updatePurchasesPayment = async (
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

export const updatePurchasesRetired = async (
    id: string,
    retired: boolean,
    fk_user: string,
    fk_store: string
): Promise<number> => {
    const validateStore = await getUser(fk_user, fk_store);
    if (!validateStore) return 0;
    if (validateStore.fk_store !== fk_store) return 0;

    const rows = await Purchases.update(
        { retired },
        { where: { id, fk_user } }
    );
    return rows[0];
};

export const updatePurchasesStatus = async (
    payment_id: string,
    status: number,
    payment_successful: boolean,
    fk_user: string,
    fk_store: string
): Promise<number> => {
    const validateStore = await getUser(fk_user, fk_store);
    if (!validateStore) return 0;
    if (validateStore.fk_store !== fk_store) return 0;

    const rows = await Purchases.update(
        { status, payment_successful },
        { where: { payment_id, fk_user } }
    );
    return rows[0];
};
