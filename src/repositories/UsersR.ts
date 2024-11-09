import Users from "../models/Users";
import Purchases from "../models/Purchases";
import { Users as UsersTypes } from "../types/db/model";

// GET
export const getUser = async (
    id: string,
    fk_store: string
): Promise<Users | null> => {
    return await Users.findOne({
        where: { id, fk_store },
        attributes: { exclude: ["password"] },
    });
};

export const getUserByEmail = async (
    email: string,
    fk_store: string
): Promise<Users | null> => {
    return await Users.findOne({ where: { email, fk_store } });
};

export const getListUsers = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Users[]> => {
    return await Users.findAll({
        where: { fk_store },
        attributes: { exclude: ["password"] },
        offset: limit_start,
        limit: limit_end,
    });
};

export const getTotalPurchasesByUser = async (
    id: string,
    fk_store: string
): Promise<number> => {
    return await Purchases.count({
        where: { id, fk_store },
    });
};

export const getTotalAmountSpentByUser = async (
    id: string,
    fk_store: string
): Promise<number> => {
    return await Purchases.sum("total", {
        where: { id, fk_store },
    });
};

export const getAllUserInfo = async (
    id: string,
    fk_store: string
): Promise<Users | null> => {
    return await Users.findOne({
        where: { id, fk_store },
        attributes: { exclude: ["password"] },
        include: {
            model: Purchases,
        },
    });
};

// POST
export const createUser = async (user: UsersTypes): Promise<Users> => {
    return await Users.create(user);
};

// PUT
export const updateUser = async (user: UsersTypes): Promise<number> => {
    const rows = await Users.update(user, {
        where: { id: user.id, fk_store: user.fk_store },
    });
    return rows[0];
};

export const updatePassword = async (
    id: string,
    password: string
): Promise<number> => {
    const rows = await Users.update({ password }, { where: { id } });
    return rows[0];
};

export const updateName = async (id: string, name: string): Promise<number> => {
    const rows = await Users.update({ name }, { where: { id } });
    return rows[0];
};

export const updateEmail = async (
    id: string,
    email: string
): Promise<number> => {
    const rows = await Users.update({ email }, { where: { id } });
    return rows[0];
};

// DELETE
export const deleteUser = async (
    id: string,
    fk_store: string
): Promise<number> => {
    const rows = await Users.destroy({ where: { id, fk_store } });
    return rows;
};
