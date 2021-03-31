import { CoreRepository } from "../../../ship/core/repository/CoreRepository";
import { User } from "../../user/models/User";
import { Doctor } from "../models";

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

    public getDoctorsByPaginate = (page: Number, count: Number) => {
        // try {
        //     const result = this.model.findAll({
        //         include: [
        //             {
        //                 model: User,
        //                 as: "user",
        //                 attributes: {
        //                     exclude: [
        //                         "createdAt",
        //                         "updatedAt",
        //                         "password",
        //                         "confirmationToken",
        //                         "id",
        //                     ],
        //                 },
        //             },
        //         ],
        //         attributes: {
        //             exclude: ["createdAt", "updatedAt"],
        //         },
        //     });
        //     return result;
        // } catch (error) {
        //     return null;
        // }
    }
}

export const doctorRepository = new DoctorRepository();
