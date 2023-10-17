import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Users as UsersTypes } from "../types/db/model";
import Companys from "./Companys";

@Table({ tableName: "users" })
export default class Users extends Model<UsersTypes> {
    @Column({
        type: DataType.STRING(36),
        primaryKey: true,
        allowNull: false,
    })
    declare id: string;

    @ForeignKey(() => Companys)
    @Column({ type: DataType.STRING(40), allowNull: false })
    declare fk_company_id: string;

    @BelongsTo(() => Companys, "fk_company_id")
    declare company: Companys;
}
