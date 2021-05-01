import { Association, DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';
import { User } from '../../user/models/User';
import { Analysis } from './Analysis';

export class Patient extends CoreModel {
    public readonly id: number;
    public weight: number;
    public height: number;
    public bloodType: string;
    public RHFactor: string;
    public allergies: string;
    public chronicDiseases: string;
    public operations: string;
    public isSmoker: string;
    public isAlcoholic: string;
    public badHabits: string;
    public bloodTransfusion: string;
    public isFullData: boolean;

    public user: User;
    public analyzes: Array<Analysis>;
}

export const patientSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.FLOAT,
    },
    height: {
        type: DataTypes.FLOAT,
    },
    bloodType: {
        type: DataTypes.ENUM('I', 'II', 'III', 'IV'),
    },
    RHFactor: {
        type: DataTypes.ENUM('Rh+', 'Rh-'),
    },
    allergies: {
        type: DataTypes.STRING,
    },
    chronicDiseases: {
        type: DataTypes.STRING,
    },
    operations: {
        type: DataTypes.STRING,
    },
    isSmoker: {
        type: DataTypes.ENUM('Да', 'Нет', 'Иногда'),
    },
    avatar: {
        type: DataTypes.STRING,
    },
    isAlcoholic: {
        type: DataTypes.ENUM(
            '1 раз в год',
            '1 раз в месяц',
            '1 раз в неделю',
            'более 3 раз в неделю'
        ),
    },
    badHabits: {
        type: DataTypes.TEXT,
    },
    bloodTransfusion: {
        type: DataTypes.STRING,
    },
    isFullData: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
};
