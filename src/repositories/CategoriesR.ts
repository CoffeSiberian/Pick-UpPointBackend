import Categories from "../models/Categories";
import { Categories as CategoriesTypes } from "../types/db/model";

// GET
export const getCategorie = async (id: string): Promise<Categories | null> => {
    return await Categories.findOne({ where: { id } });
};

export const getCategories = async (
    fk_store: string
): Promise<Categories[]> => {
    return await Categories.findAll({ where: { fk_store } });
};

// POST
export const createCategories = async (
    data: CategoriesTypes
): Promise<Categories> => {
    return await Categories.create(data);
};

// PUT
export const updateCategories = async (
    id: string,
    data: CategoriesTypes
): Promise<number> => {
    const rows = await Categories.update(data, { where: { id } });
    return rows[0];
};

// DELETE
export const deleteCategories = async (id: string): Promise<number> => {
    const rows = await Categories.destroy({ where: { id } });
    return rows;
};
