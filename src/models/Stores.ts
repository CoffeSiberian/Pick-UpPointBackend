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

    @HasOne(() => Configs)
    declare configs?: Configs;

    @HasMany(() => Users)
    declare members?: Users[];

    @HasMany(() => Categories)
    declare categories?: Categories[];

    @HasMany(() => Stocks)
    declare stocks?: Stocks[];
}
