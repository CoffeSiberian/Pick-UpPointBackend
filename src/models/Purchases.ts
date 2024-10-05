import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Purchases as PurchasesTypes } from "../types/db/model";
import Users from "./Users";
import Stores from "./Stores";
import Purchases_Items from "./Purchases_Items";

@Table({ tableName: "purchases" })
export default class Purchases extends Model<PurchasesTypes> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare total: number;

    @Column({ type: DataType.DATE, allowNull: false })
    declare date: Date;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare status: number;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare payment_method: number;

    @Column({ type: DataType.STRING(128), allowNull: true })
    declare payment_id: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare payment_successful: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare retired: boolean;

    @ForeignKey(() => Users)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_user: string;

    @ForeignKey(() => Stores)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_store: string;

    @BelongsTo(() => Users, "fk_user")
    declare user: Users;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;

    @HasMany(() => Purchases_Items)
    declare purchases_items?: Purchases_Items[];
}
