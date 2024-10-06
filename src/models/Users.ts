import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Users as UsersTypes } from "../types/db/model";
import Stores from "./Stores";
import Purchases from "./Purchases";

@Table({ tableName: "users" })
export default class Users extends Model<UsersTypes> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    declare id: string;

    @Column({ type: DataType.STRING(15), allowNull: false, unique: true })
    declare rut: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(256), allowNull: false, unique: true })
    declare email: string;

    @Column({ type: DataType.STRING(500), allowNull: false })
    declare password: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare isAdmin: boolean;

    @ForeignKey(() => Stores)
    @Column({ type: DataType.UUID, allowNull: false })
    declare fk_store: string;

    @BelongsTo(() => Stores, "fk_store")
    declare store: Stores;

    @HasMany(() => Purchases)
    declare purchases?: Purchases[];
}
