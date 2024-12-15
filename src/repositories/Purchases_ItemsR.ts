import Purchases_Items from "../models/Purchases_Items";
import Purchases from "../models/Purchases";
import Products from "../models/Products";
import Categories from "../models/Categories";
import { Purchases_Items as Purchases_ItemsTypes } from "../types/db/model";
import Images_Products from "../models/ImagesProducts";
import { fn, Op } from "sequelize";

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

export const getAllItemsPurchased = async (
    fk_purchase: string,
    fk_store: string
): Promise<Purchases_Items[]> => {
    return await Purchases_Items.findAll({
        where: { fk_purchase },
        include: [
            {
                model: Products,
                include: [
                    { model: Categories, attributes: ["name"] },
                    {
                        as: "primary_image",
                        model: Images_Products,
                    },
                ],
            },
            { model: Purchases, where: { fk_store }, attributes: [] },
        ],
    });
};

export const getMostPurchasedItems = async (
    fk_store: string,
    date_start: string,
    date_end: string
): Promise<Purchases_Items[]> => {
    return await Purchases_Items.findAll({
        attributes: ["fk_product", [fn("COUNT", "fk_product"), "total"]],
        include: [
            {
                model: Purchases,
                where: {
                    fk_store,
                    date: {
                        [Op.between]: [date_start, date_end],
                    },
                },
                attributes: [],
            },
            {
                model: Products,
                attributes: {
                    exclude: [
                        "fk_category",
                        "createdAt",
                        "updatedAt",
                        "is_active",
                    ],
                },
                include: [
                    {
                        as: "primary_image",
                        model: Images_Products,
                    },
                ],
            },
        ],
        group: ["fk_product"],
        order: [[fn("COUNT", "fk_product"), "DESC"]],
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
