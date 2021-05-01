import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Card extends CoreModel {
    public readonly id: number;
    public cardNumber: string;
    public validThru: string;
    public cardValidationCode: string;
    public ownersName: string;
    public isSavedCard: boolean;
}

export const cardSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    cardNumber: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    validThru: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    cardValidationCode: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    ownersName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    isSavedCard: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
};
