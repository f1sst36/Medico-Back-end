import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Consultation extends CoreModel {
    public readonly id: Number;
    public patientId: Number;
    public doctorId: Number;
    public communicationMethodId: Number;
    public receptionDate: Date;
    public symptoms: String;
    public paymentId: Number;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public getReceptionTime = (): String => {
        return 'string';
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
    paymentId: {
        // allowNull: false - когда будешь прикручивать платежку
        allowNull: true,
        type: DataTypes.INTEGER,
    },
    isActive: {
        // идет ли консультация в текущий момент
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isCanceled: {
        // отменена ли консультация
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDone: {
        // завершена ли консультация
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
