import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Categories as CategoriesTypes } from "../types/db/model";
import Stores from "./Stores";
import Products from "./Products";

@Table({ tableName: "categories" })
export default class Categories extends Model<CategoriesTypes> {
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

    @ForeignKey(() => Stores)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_store: string;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;

    @HasMany(() => Products)
    declare products?: Products[];
}
