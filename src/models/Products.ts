import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasOne,
    HasMany,
} from "sequelize-typescript";
import { Products as ProductsTypes } from "../types/db/model";
import Categories from "./Categories";
import Stocks from "./Stocks";
import Images_Products from "./ImagesProducts";

@Table({ tableName: "products" })
export default class Products extends Model<ProductsTypes> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(3000), allowNull: true })
    declare description: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare price: number;

    @ForeignKey(() => Categories)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_category: string;

    @BelongsTo(() => Categories, "fk_category")
    declare category: Categories;

    @HasOne(() => Stocks)
    declare stock: Stocks;

    @HasMany(() => Images_Products)
    declare images?: Images_Products[];
}
