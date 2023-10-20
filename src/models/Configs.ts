import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Configs as ConfigsTypes } from "../types/db/model";
import Stores from "./Stores";

@Table({ tableName: "configs" })
export default class Configs extends Model<ConfigsTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: true })
    declare payment_method: string | null;

    @Column({ type: DataType.STRING(256), allowNull: true })
    declare api_key_private: string | null;

    @Column({ type: DataType.STRING(256), allowNull: true })
    declare api_key_public: string | null;

    @ForeignKey(() => Stores)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_store: string;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;
}
