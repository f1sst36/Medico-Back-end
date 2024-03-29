import { DataTypes } from "sequelize";

import { CoreModel } from "../../../ship/core/model/CoreModel";
import { Doctor, Specialty } from "./";

export class DoctorSpecialtiesLink extends CoreModel {
    public readonly id: number;
    public doctorId: number;
    public specialtyId: number;

    public readonly doctor: Doctor;
    public readonly specialty: Specialty;
}

export const doctorSpecialtiesLinkSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    doctorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    specialtyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
};
