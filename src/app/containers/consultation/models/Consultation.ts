import { Doctor, Specialty } from '../../doctor/models';
import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';
import { CommunicationMethod } from './CommunicationMethod';
import { Patient } from '../../patient/models/Patient';

export class Consultation extends CoreModel {
    public readonly id: number;
    public patientId: number;
    public doctorId: number;
    public communicationMethodId: number;
    public doctorSpecialtyId: number;
    public receptionDate: Date;
    public symptoms: string;
    public appointment: string;
    public paymentId: number;
    public state: string;
    public isFirstConsultation: string;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public doctor: Doctor;
    public patient: Patient;
    public communicationMethod: CommunicationMethod;
    public doctorSpecialty: Specialty;

    public getReceptionHours = (): number => {
        // 3 для часового пояса
        // return this.receptionDate.getHours() - 3;
        return this.receptionDate.getHours();
    };
}

export const consultationSchema = {
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
    doctorSpecialtyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    communicationMethodId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    receptionDate: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    symptoms: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    appointment: {
        allowNull: true,
        type: DataTypes.TEXT,
    },
    paymentId: {
        // allowNull: false - когда будешь прикручивать платежку
        allowNull: true,
        type: DataTypes.INTEGER,
    },
    state: {
        allowNull: false,
        type: DataTypes.ENUM('active', 'canceled', 'done', 'waiting', 'error'),
        defaultValue: 'waiting',
    },
    isFirstConsultation: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
