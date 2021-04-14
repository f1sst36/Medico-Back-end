import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";

export class Payment extends CoreModel {
    public readonly id: Number;
}

export const paymentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
};
