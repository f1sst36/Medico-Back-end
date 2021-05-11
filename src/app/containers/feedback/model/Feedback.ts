import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Feedback extends CoreModel {
    public readonly id: Number;
    public name: string;
    public email: string;
    public subject: string;
    public text: string;
}

export const feedbackSchema = {
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
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    subject: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    text: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
};
