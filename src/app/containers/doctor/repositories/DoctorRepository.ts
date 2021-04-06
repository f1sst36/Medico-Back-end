import { Patient } from "../../../containers/patient/models/Patient";
import { Op } from "sequelize";
import { CoreRepository } from "../../../ship/core/repository/CoreRepository";
import { User } from "../../user/models/User";
import { Doctor, DoctorSpecialtiesLink, Specialties } from "../models";
import { Review } from "../models/Review";

class DoctorRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Doctor;
    }

    public getDoctorById = (id: Number): Promise<Doctor> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "password",
                                "confirmationToken",
                                "id",
                            ],
                        },
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: "doctorSpecialtiesLink",
                        include: [
                            {
                                model: Specialties,
                                as: "specialty",
                                attributes: ["id", "name", "slug"],
                            },
                        ],
                    },
                    {
                        model: Review,
                        as: "reviews",
                        include: [
                            {
                                model: Patient,
                                as: "patient",
                                include: [
                                    {
                                        model: User,
                                        as: "user",
                                        attributes: ["name", "surname"],
                                    },
                                ],
                                attributes: ["avatar"],
                            },
                        ],
                    },
                ],
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getDoctorsByPaginate = (page: number, count: number) => {
        try {
            const result = this.model.findAll({
                where: { isVerified: true },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "surname", "middleName"],
                    },
                    {
                        model: DoctorSpecialtiesLink,
                        as: "doctorSpecialtiesLink",
                        include: [
                            {
                                model: Specialties,
                                as: "specialty",
                                attributes: ["id", "name", "slug"],
                            },
                        ],
                    },
                ],
                attributes: [
                    "about",
                    "rating",
                    "experience",
                    "costOfConsultation",
                    "workTime",
                    "photo",
                ],
                offset: (page - 1) * count,
                limit: count,
            });
            return result;
        } catch (_) {
            return null;
        }
    };

    public getCountOfDoctors = (): Promise<number> => {
        try {
            const result = this.model.count({
                where: {
                    id: {
                        [Op.gt]: 0,
                    },
                    isVerified: true,
                },
            });
            return result;
        } catch (_) {
            return null;
        }
    };
}

export const doctorRepository = new DoctorRepository();
