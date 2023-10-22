import Stocks from "../models/Stocks";
import { Stocks as StocksTypes } from "../types/db/model";

// GET
export const getStock = async (id: string): Promise<Stocks | null> => {
    return await Stocks.findOne({ where: { id } });
};

// POST
export const createStock = async (stock: StocksTypes): Promise<Stocks> => {
    return await Stocks.create(stock);
};

// DELETE
export const deleteStock = async (id: string): Promise<number> => {
    return await Stocks.destroy({ where: { id } });
};
