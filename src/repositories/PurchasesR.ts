import { Transaction } from "sequelize";

// models
import Products from "../models/Products";
import Images_Products from "../models/ImagesProducts";
import Purchases from "../models/Purchases";
import Purchases_Items from "../models/Purchases_Items";
import Users from "../models/Users";
import { getUser } from "./UsersR";

// types
import { Purchases_Items as Purchases_ItemsTypes } from "../types/db/model";
import { Purchases as PurchasesTypes } from "../types/db/model";

// GET
export const getPurchases = async (
    fk_user: string,
    limit_start: number,
    limit_end: number
): Promise<Purchases[]> => {
    return await Purchases.findAll({
        where: { fk_user },
        limit: limit_end,
        offset: limit_start,
    });
};

export const getPurchasesById = async (
    id: string,
    fk_user: string
): Promise<Purchases | null> => {
    return await Purchases.findOne({
        where: { id, fk_user },
        include: [
            {
                model: Purchases_Items,
                include: [
                    {
                        model: Products,
                        include: [
                            {
                                model: Images_Products,
                            },
                        ],
                    },
                ],
            },
        ],
    });
};

export const getPurchasesByOnlyId = async (
    id: string,
    fk_store: string
): Promise<Purchases | null> => {
    return await Purchases.findOne({
        include: [
            {
                model: Purchases_Items,
                include: [
                    {
                        model: Products,
                        include: [
                            {
                                model: Images_Products,
                            },
                        ],
                    },
                ],
            },
            {
                model: Users,
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "fk_store"],
                },
            },
        ],
        where: { id, fk_store },
    });
};

export const getAllStorePurchases = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Purchases[]> => {
    return await Purchases.findAll({
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "fk_store"],
                },
            },
        ],
        where: { fk_store },
        limit: limit_end,
        offset: limit_start,
    });
};

// POST
export const createPurchasesWithTransaction = async (
    purchases: PurchasesTypes,
    transaction: Transaction
): Promise<Purchases> => {
    return await Purchases.create(purchases, { transaction });
};

export const createPurchaseItems = async (
    items: Purchases_ItemsTypes[],
    transaction: Transaction
): Promise<Purchases_Items[]> => {
    return await Purchases_Items.bulkCreate(items, { transaction });
};

// PUT
export const updatePurchase = async (
    id: string,
    purchases: PurchasesTypes,
    transaction: Transaction
): Promise<number> => {
    const rows = await Purchases.update(purchases, {
        where: { id },
        transaction,
    });
    return rows[0];
};

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
