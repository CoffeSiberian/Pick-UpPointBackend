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
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare price: number;

    @ForeignKey(() => Purchases)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_purchase: string;

    @ForeignKey(() => Products)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_product: string;

    @BelongsTo(() => Purchases, "fk_purchase")
    declare purchase: Purchases;

    @BelongsTo(() => Products, "fk_product")
    declare product: Products;
}
