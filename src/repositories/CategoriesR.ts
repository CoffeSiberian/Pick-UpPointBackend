import Categories from "../models/Categories";
import { Categories as CategoriesTypes } from "../types/db/model";

// GET
export const getCategorie = async (
    id: string,
    fk_store: string
): Promise<Categories | null> => {
    return await Categories.findOne({ where: { id, fk_store } });
};

export const getCategories = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Categories[]> => {
    return await Categories.findAll({
        where: { fk_store },
        limit: limit_end,
        offset: limit_start,
        order: [["createdAt", "DESC"]],
    });
};

export const getAllCategories = async (
    fk_store: string
): Promise<Categories[]> => {
    return await Categories.findAll({
        where: { fk_store },
        attributes: { exclude: ["fk_store", "createdAt", "updatedAt"] },
        order: [["createdAt", "DESC"]],
    });
};

// POST
export const createCategories = async (
    data: CategoriesTypes
): Promise<Categories> => {
    return await Categories.create(data);
};

// PUT
export const updateCategoriesName = async (
    id: string,
    fk_store: string,
    name: string
): Promise<number> => {
    const rows = await Categories.update({ name }, { where: { id, fk_store } });
    return rows[0];
};

// DELETE
export const deleteCategorie = async (
    id: string,
    fk_store: string
): Promise<number> => {
    const rows = await Categories.destroy({ where: { id, fk_store } });
    return rows;
};
