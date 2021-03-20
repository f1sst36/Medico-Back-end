import { Association, DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";

export class User extends CoreModel {
    public readonly id: Number;
    public name: String;
    public surname: String;
    public middleName: String;
    public sex: String;
    public birthDate: Date;
    public phone: String;
    public email: String;
    public isActivated: Boolean;
    public password: String;
    public confirmationToken: String;
    public acceptedUserAgreement: Boolean;
    public readonly userType: String;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    // static associate(models) {
    //     User.belongsTo(models.Post, {
    //         foreignKey: "userId",
    //         as: "user",
    //     });
    // }

    // public static associations: {
    //     projects: Association<User, Project>;
    // };
}

export const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    surname: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    middleName: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "",
    },
    sex: {
        allowNull: false,
        type: DataTypes.ENUM("male", "female"),
    },
    birthDate: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    isActivated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    confirmationToken: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    acceptedUserAgreement: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    userType: {
        allowNull: false,
        type: DataTypes.ENUM("doctor", "patient"),
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
