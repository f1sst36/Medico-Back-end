import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";

export class CommunicationMethod extends CoreModel {
    public readonly id: Number;
    public method: String;
}

export const communicationMethodSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    method: {
        allowNull: false,
        type: DataTypes.STRING,
    },
};
