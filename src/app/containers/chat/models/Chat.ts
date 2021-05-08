import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Chat extends CoreModel {
    public readonly id: Number;
    public patientId: number;
    public doctorId: number;
    public isOpenedAccess: boolean;
}

export const chatSchema = {
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
    doctorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    isOpenedAccess: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
};
