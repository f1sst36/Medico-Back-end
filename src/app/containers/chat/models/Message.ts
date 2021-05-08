import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Message extends CoreModel {
    public readonly id: Number;
    public patientId: number;
    public doctorId: number;
    public isOpenedAccess: boolean;
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
};
