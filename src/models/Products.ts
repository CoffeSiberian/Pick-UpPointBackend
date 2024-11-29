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
        defaultValue: DataType.UUIDV4,
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

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    declare is_active: boolean;

    @ForeignKey(() => Categories)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_category: string;

    @BelongsTo(() => Categories, "fk_category")
    declare category: Categories;

    @HasOne(() => Stocks)
    declare stock: Stocks;

    @HasMany(() => Images_Products)
    declare images?: Images_Products[];

    @ForeignKey(() => Images_Products)
    @Column({ type: DataType.UUID, allowNull: true })
    declare primary_image_id: string;

    @BelongsTo(() => Images_Products, "primary_image_id")
    declare primary_image?: Images_Products;
}
