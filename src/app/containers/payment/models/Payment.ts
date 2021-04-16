import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';

export class Payment extends CoreModel {
    public readonly id: Number;
    public cardId: Number;
}

export const paymentSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    cardId: {
        allowNull: true,
        type: DataTypes.INTEGER,
    },
};
