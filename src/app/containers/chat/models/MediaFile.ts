import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class MediaFile extends CoreModel {
    public readonly id: Number;
    public messageId: number;
    public path: string;
    public name: string;
    public size: number;
    public type: string;
}

export const mediaFileSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    messageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    path: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    size: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM('image', 'audio', 'file'),
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
};
