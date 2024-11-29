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
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare file_name: string;

    @ForeignKey(() => Products)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_products: string;

    @BelongsTo(() => Products, "fk_products")
    declare Product: Products;
}
