import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Stocks as StocksTypes } from "../types/db/model";
import Stores from "./Stores";
import Products from "./Products";

@Table({ tableName: "stocks" })
export default class Stocks extends Model<StocksTypes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare quantity: number;

    @ForeignKey(() => Stores)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_store: string;

    @ForeignKey(() => Products)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_product: string;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;

    @BelongsTo(() => Products, "fk_product")
    declare product: Products;
}
