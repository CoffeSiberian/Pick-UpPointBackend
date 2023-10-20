import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Users as UsersTypes } from "../types/db/model";
import Stores from "./Stores";
import Purchases from "./Purchases";

@Table({ tableName: "users" })
export default class Users extends Model<UsersTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.STRING(15), allowNull: false })
    declare rut: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING(500), allowNull: false })
    declare password: string;

    @ForeignKey(() => Stores)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_store: string;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;

    @HasMany(() => Purchases)
    declare purchases?: Purchases[];
}
