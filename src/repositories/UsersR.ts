import Users from "../models/Users";
import { Users as UsersTypes } from "../types/db/model";

// GET
export const getUser = async (id: string): Promise<Users | null> => {
    return await Users.findOne({ where: { id } });
};

export const getListUsers = async (
    fk_store: string,
    limit_start: number,
    limit_end: number
): Promise<Users[]> => {
    return await Users.findAll({
        where: { fk_store },
        offset: limit_start,
        limit: limit_end,
    });
};

// POST
export const createUser = async (user: UsersTypes): Promise<Users> => {
    return await Users.create(user);
};

// PUT
export const updateUser = async (user: UsersTypes): Promise<number> => {
    const rows = await Users.update(user, { where: { id: user.id } });
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
export const deleteUser = async (id: string): Promise<number> => {
    const rows = await Users.destroy({ where: { id } });
    return rows;
};
