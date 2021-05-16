import { User } from '../../user/models/User';
import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Message extends CoreModel {
    public readonly id: Number;
    public chatId: number;
    public authorId: number;
    public text: string;
    public deletedAt: Date;

    public user: User;
}

export const messageSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    chatId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    authorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    text: {
        allowNull: false,
        type: DataTypes.STRING(2000),
    },
    deletedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
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
