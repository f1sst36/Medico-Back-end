import { Patient } from '../../../containers/patient/models/Patient';
import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Review extends CoreModel {
    public readonly id: Number;
    public patientId: Number;
    public doctorId: Number;
    public text: String;
    public estimation: Number;
    public createdAt: Date;
    public updatedAt: Date;

    public patient: Patient;
}

export const reviewSchema = {
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
    text: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    estimation: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
};
