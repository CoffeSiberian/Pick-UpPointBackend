import Configs from "../models/Configs";
import { Configs as ConfigsTypes } from "../types/db/model";

// GET
export const getConfigs = async (fk_store: string): Promise<Configs | null> => {
    return await Configs.findOne({ where: { fk_store } });
};

// POST
export const createConfigs = async (
    configs: ConfigsTypes
): Promise<Configs> => {
    return await Configs.create(configs);
};

// PUT
export const updateConfigs = async (configs: ConfigsTypes): Promise<number> => {
    const rows = await Configs.update(configs, {
        where: { fk_store: configs.fk_store },
    });
    return rows[0];
};

export const updateConfigsApiKeys = async (
    fk_store: string,
    api_key_private: string,
    api_key_public: string
): Promise<number> => {
    const rows = await Configs.update(
        { api_key_private, api_key_public },
        { where: { fk_store } }
    );
    return rows[0];
};

export const updateConfigsLogo = async (
    fk_store: string,
    logo: string
): Promise<number> => {
    const rows = await Configs.update({ logo }, { where: { fk_store } });
    return rows[0];
};

export const updateConfigsAdmin = async (
    fk_store: string,
    adminname: string,
    adminemail: string,
    adminpassword: string
): Promise<number> => {
    const rows = await Configs.update(
        { adminname, adminemail, adminpassword },
        { where: { fk_store } }
    );
    return rows[0];
};
