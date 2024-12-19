import Images_Products from "../models/ImagesProducts";
import { Images_Products as Images_ProductsTypes } from "../types/db/model";

// GET
export const getImagesProducts = async (
    fk_products: string
): Promise<Images_Products[]> => {
    return await Images_Products.findAll({
        where: { fk_products },
        order: [["createdAt", "DESC"]],
    });
};

// POST
export const createImagesProducts = async (
    images_products: Images_ProductsTypes
): Promise<Images_Products> => {
    return await Images_Products.create(images_products);
};

// DELETE
export const deleteImagesProducts = async (id: string): Promise<number> => {
    const rows = await Images_Products.destroy({
        where: { id },
    });
    return rows;
};
