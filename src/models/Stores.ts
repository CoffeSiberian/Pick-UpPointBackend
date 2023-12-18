import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    HasOne,
} from "sequelize-typescript";
import { Stores as StoresTypes } from "../types/db/model";
import Users from "./Users";
import Purchases from "./Purchases";
import Stocks from "./Stocks";
import Categories from "./Categories";
import Configs from "./Configs";

@Table({ tableName: "stores" })
export default class Stores extends Model<StoresTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare name: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare location: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare phone: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING(256), allowNull: false })
    declare domain: string;

    @HasOne(() => Configs)
    declare configs?: Configs;

    @HasMany(() => Users)
    declare members?: Users[];

    @HasMany(() => Purchases)
    declare purchases?: Purchases[];

    @HasMany(() => Categories)
    declare categories?: Categories[];

    @HasMany(() => Stocks)
    declare stocks?: Stocks[];
}
