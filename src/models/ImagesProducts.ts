import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Images_Products as Images_ProductsType } from "../types/db/model";
import Products from "./Products";

@Table({ tableName: "images_products" })
export default class Images_Products extends Model<Images_ProductsType> {
    @Column({
        type: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(3000), allowNull: false })
    declare src: string;

    @ForeignKey(() => Products)
    @Column({ type: DataType.STRING(36), allowNull: false })
    declare fk_products: string;

    @BelongsTo(() => Products, "fk_products")
    declare Product: Products;
}
