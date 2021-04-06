import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";

export class Review extends CoreModel {
    public readonly id: Number;
    public patientId: Number;
    public text: String;
    public estimation: Number;
    public createdAt: String | Date;
}

export const reviewSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    patientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    text: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    estimation: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.STRING
    }
};
