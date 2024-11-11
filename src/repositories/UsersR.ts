import Users from "../models/Users";
import Purchases from "../models/Purchases";
import { Users as UsersTypes, UsersWithoutPassword } from "../types/db/model";

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
    fk_user: string
): Promise<number> => {
    return await Purchases.count({
        where: { fk_user },
    });
};

export const getTotalAmountSpentByUser = async (
    fk_user: string
): Promise<number | null> => {
    return await Purchases.sum("total", {
        where: { fk_user },
    });
};

export const getAllUserInfo = async (
    id: string,
    fk_store: string
): Promise<Users | null> => {
    return await Users.findOne({
        where: { id, fk_store },
        attributes: { exclude: ["password"] },
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

export const updateUserWhitoutPassword = async (
    user: UsersWithoutPassword
): Promise<number> => {
    const rows = await Users.update(
        { name: user.name, email: user.email },
        { where: { id: user.id, fk_store: user.fk_store } }
    );
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
