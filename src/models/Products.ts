import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasOne,
} from "sequelize-typescript";
import { Products as ProductsTypes } from "../types/db/model";
import Categories from "./Categories";
import Stocks from "./Stocks";

@Table({ tableName: "products" })
export default class Products extends Model<ProductsTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare price: number;

    @ForeignKey(() => Categories)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_category: string;

    @BelongsTo(() => Categories, "fk_category")
    declare category: Categories;

    @HasOne(() => Stocks)
    declare stock: Stocks;
}
