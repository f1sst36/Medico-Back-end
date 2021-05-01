import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";

export class Specialty extends CoreModel {
    public readonly id: number;
    public readonly name: string;
    public readonly slug: string;
}

export const specialtySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    slug: {
        allowNull: false,
        type: DataTypes.STRING
    }
};
