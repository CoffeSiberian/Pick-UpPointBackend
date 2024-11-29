import { sequelize } from "../models/database";
import Products from "../models/Products";
import Categories from "../models/Categories";
import Stocks from "../models/Stocks";
import Images_Products from "../models/ImagesProducts";
import { Products as ProductsTypes } from "../types/db/model";
import { getCategorie } from "./CategoriesR";

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
                as: "images",
                model: Images_Products,
            },
            {
                as: "primary_image",
                model: Images_Products,
            },
        ],
    });
};

export const getAllStoreProducts = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Products[]> => {
    return await Products.findAll({
        include: [
            {
                model: Categories,
                where: { fk_store },
            },
            {
                model: Stocks,
            },
            {
                as: "images",
                model: Images_Products,
            },
            {
                as: "primary_image",
                model: Images_Products,
            },
        ],
        attributes: { exclude: ["is_active"] },
        limit: limit_end,
        offset: limit_start,
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

export const getManyProducts = async (
    ids: string[]
): Promise<Products[] | null> => {
    return await Products.findAll({
        where: { id: ids },
        include: [
            {
                model: Stocks,
            },
            {
                model: Images_Products,
            },
        ],
    });
};

// POST
export const createProduct = async (
    product: ProductsTypes,
    fk_store: string
): Promise<Products> => {
    const validateStore = await getCategorie(product.fk_category, fk_store);
    if (!validateStore) throw new Error("Category not found");
    if (validateStore.fk_store !== fk_store) throw new Error("Not your store");

    return await Products.create(product);
};

export const createProductWithStock = async (
    product: ProductsTypes,
    stock: number,
    fk_store: string
): Promise<Products> => {
    const validateStore = await getCategorie(product.fk_category, fk_store);
    if (!validateStore) throw new Error("Category not found");
    if (validateStore.fk_store !== fk_store) throw new Error("Not your store");

    const t = await sequelize.transaction(async (transaction) => {
        const newProduct = await Products.create(product, { transaction });
        await Stocks.create(
            {
                quantity: stock,
                fk_product: newProduct.id!,
                fk_store,
            },
            { transaction }
        );

        return newProduct;
    });

    return t;
};

export const createProductImages = async (
    fk_product: string,
    image: string,
    fk_store: string
): Promise<Images_Products> => {
    const validateStore = await getProduct(fk_product);
    if (!validateStore) throw new Error("Category not found");
    if (validateStore.category.fk_store !== fk_store) {
        throw new Error("Not your store");
    }

    return await Images_Products.create({
        fk_products: fk_product,
        file_name: image,
    });
};

// PUT
export const updateProduct = async (
    id: string,
    product: ProductPost,
    fk_store: string
): Promise<number> => {
    const validateStore = await getProduct(id);
    if (!validateStore) return 0;
    if (validateStore.category.fk_store !== fk_store) return 0;

    const rows = await Products.update(product, { where: { id } });
    return rows[0];
};

export const updateStock = async (
    fk_product: string,
    stock: number,
    fk_store: string
): Promise<number> => {
    const validateStore = await getProduct(fk_product);
    if (!validateStore) return 0;
    if (validateStore.category.fk_store !== fk_store) return 0;

    const rows = await Stocks.update(
        { quantity: stock },
        { where: { fk_product } }
    );
    return rows[0];
};

export const updatePrimaryImage = async (
    fk_product: string,
    fk_image: string,
    fk_store: string
): Promise<number> => {
    const validateStore = await getProduct(fk_product);
    if (!validateStore) return 0;
    if (validateStore.category.fk_store !== fk_store) return 0;

    const rows = await Products.update(
        { primary_image_id: fk_image },
        { where: { id: fk_product } }
    );
    return rows[0];
};

// DELETE
export const deleteProduct = async (
    id: string,
    fk_store: string
): Promise<number> => {
    const validateStore = await getProduct(id);
    if (!validateStore) return 0;
    if (validateStore.category.fk_store !== fk_store) return 0;

    const rows = await Products.destroy({ where: { id } });
    return rows;
};

export const deleteProductImage = async (
    id: string,
    fk_product: string,
    fk_store: string
): Promise<number> => {
    const validateStore = await getProduct(fk_product);
    if (!validateStore) return 0;
    if (validateStore.category.fk_store !== fk_store) return 0;

    const rows = await Images_Products.destroy({
        where: { id, fk_products: fk_product },
    });
    return rows;
};
