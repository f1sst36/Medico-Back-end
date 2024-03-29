import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Analysis extends CoreModel {
    public readonly id: number;
    public patientId: number;
    public name: string;
    public type: string;
    public path: string;
    public analysisDeliveryDate: Date;
}

export const analysisSchema = {
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
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM('analysis', 'snapshot'),
    },
    path: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    analysisDeliveryDate: {
        allowNull: false,
        type: DataTypes.DATE,
    },
};
