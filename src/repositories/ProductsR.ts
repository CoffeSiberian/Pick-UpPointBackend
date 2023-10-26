import Products from "../models/Products";
import Categories from "../models/Categories";
import Stocks from "../models/Stocks";
import Images_Products from "../models/ImagesProducts";
import { Products as ProductsTypes } from "../types/db/model";

// GET
export const getProduct = async (id: string): Promise<Products | null> => {
    return await Products.findOne({
        where: { id },
        include: [
            {
                model: Stocks,
            },
            {
                model: Categories,
            },
            {
                model: Images_Products,
            },
        ],
    });
};

export const getAllStoreProducts = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Categories[]> => {
    return await Categories.findAll({
        where: { fk_store },
        include: [
            {
                model: Products,
                include: [
                    {
                        model: Stocks,
                    },
                    {
                        model: Images_Products,
                    },
                ],
                limit: limit_end,
                offset: limit_start, // https://github.com/sequelize/sequelize/issues/12969
            },
        ],
    });
};

export const getCategoriesProducts = async (
    id: string,
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Categories | null> => {
    return await Categories.findOne({
        where: { fk_store, id },
        include: [
            {
                model: Products,
                include: [
                    {
                        model: Stocks,
                    },
                    {
                        model: Images_Products,
                    },
                ],
                limit: limit_end,
                offset: limit_start, // https://github.com/sequelize/sequelize/issues/12969
            },
        ],
    });
};

// POST
export const createProduct = async (
    product: ProductsTypes
): Promise<Products> => {
    return await Products.create(product);
};

// PUT
export const updateProduct = async (
    id: string,
    product: ProductPost
): Promise<number> => {
    const rows = await Products.update(product, { where: { id } });
    return rows[0];
};

export const updateStock = async (
    fk_product: string,
    stock: number
): Promise<number> => {
    const rows = await Stocks.update(
        { quantity: stock },
        { where: { fk_product } }
    );
    return rows[0];
};
