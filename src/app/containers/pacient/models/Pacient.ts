import { Association, DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";
import { User } from "../../user/models/User";

export class Pacient extends CoreModel {
    public readonly id: Number;
    public height: Number;
    public bloodType: String;
    public allergies: Array<String>;
    public chronicDiseases: Array<String>;
    public operations: Array<String>;
    public isSmoker: Boolean;
    public isAlcoholic: Boolean;
    public badHabits: Array<String>;
    public bloodTransfusion: String;

    public user: User;

    // static associate(models) {
    //     Pacient.hasOne(models.User, {
    //         foreignKey: "id",
    //         as: "user",
    //     });
    // }

    // public static associations: {
    //     projects: Association<User, Project>;
    // };
}

// Pacient.hasOne(User, {
//     foreignKey: "id",
//     as: "user",
// });

export const pacientSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    height: {
        type: DataTypes.FLOAT,
    },
    bloodType: {
        type: DataTypes.ENUM(
            "abNegative",
            "abPositive ",
            "aNegative",
            "aPositive",
            "bNegative",
            "bPositive",
            "oNegative",
            "oPositive",
            "notSet"
        ),
    },
    allergies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    chronicDiseases: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    operations: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isSmoker: {
        type: DataTypes.BOOLEAN,
    },
    isAlcoholic: {
        type: DataTypes.BOOLEAN,
    },
    badHabits: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    bloodTransfusion: {
        type: DataTypes.DATE,
    },
};
