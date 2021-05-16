import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

import { Doctor } from '../../doctor/models';
import { Patient } from '../../patient/models/Patient';
import { Message } from './Message';

export class Chat extends CoreModel {
    public readonly id: Number;
    public patientId: number;
    public doctorId: number;
    public isOpenedAccess: boolean;

    public patient: Patient;
    public doctor: Doctor;
    public messages: Array<Message>;
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
