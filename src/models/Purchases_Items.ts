import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasOne,
} from "sequelize-typescript";
import { Purchases_Items as Purchases_ItemsTypes } from "../types/db/model";
import Purchases from "./Purchases";
import Products from "./Products";

@Table({ tableName: "purchases_items" })
export default class Purchases_Items extends Model<Purchases_ItemsTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;

    @ForeignKey(() => Purchases)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_purchase: string;

    @ForeignKey(() => Products)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_product: string;

    @BelongsTo(() => Purchases, "fk_purchase")
    declare purchase: Purchases;

    @BelongsTo(() => Products, "fk_product")
    declare product: Products;
}
