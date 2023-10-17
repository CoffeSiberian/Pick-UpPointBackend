import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Companys as CompanysTypes } from "../types/db/model";
import Users from "./Users";

@Table({ tableName: "companys" })
export default class Companys extends Model<CompanysTypes> {
    @Column({
        type: DataType.STRING(40),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @HasMany(() => Users)
    declare members?: Users[];
}
