import { Association, DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";
import { User } from "../../user/models/User";

export class Patient extends CoreModel {
    public readonly id: Number;
    public weight: Number;
    public height: Number;
    public bloodType: String;
    public RHFactor: String;
    public allergies: String;
    public chronicDiseases: String;
    public operations: String;
    public isSmoker: String;
    public isAlcoholic: String;
    public badHabits: String;
    public bloodTransfusion: Boolean;
    public specialDiseases: Array<String>;
    public isFullData: Boolean;

    public user: User;
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
        type: DataTypes.ENUM("I", "II", "III", "IV"),
    },
    RHFactor: {
        type: DataTypes.ENUM("Rh+", "Rh-"),
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
        type: DataTypes.ENUM("Да", "Нет", "Иногда"),
    },
    isAlcoholic: {
        type: DataTypes.ENUM(
            "1 раз в год",
            "1 раз в месяц",
            "1 раз в неделю",
            "более 3 раз в неделю"
        ),
    },
    badHabits: {
        type: DataTypes.TEXT,
    },
    bloodTransfusion: {
        type: DataTypes.BOOLEAN,
    },
    specialDiseases: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isFullData: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
};
