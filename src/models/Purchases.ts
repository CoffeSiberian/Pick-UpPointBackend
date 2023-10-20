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
import Purchases_Items from "./Purchases_Items";

@Table({ tableName: "purchases" })
export default class Purchases extends Model<PurchasesTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare total: number;

    @ForeignKey(() => Users)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_user: string;

    @BelongsTo(() => Users, "fk_user")
    declare user: Users;

    @HasMany(() => Purchases_Items)
    declare purchases_items?: Purchases_Items[];
}
