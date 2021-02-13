import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";
import { User } from "../../user/models/User";

export class Doctor extends CoreModel {
    public readonly id: Number;
    public IIN: String;
    public experience: Date;
    public photo: String;
    public summary: String;
    public about: String;
    public mainDirections: Array<String>;
    public workplaces: Array<String>;
    public education: Array<String>;

    public user: User;
}


export const doctorSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    IIN: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.DATE,
    },
    photo: {
        type: DataTypes.STRING,
    },
    summary: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.TEXT,
    },
    mainDirections: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    workplaces: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    education: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
};
