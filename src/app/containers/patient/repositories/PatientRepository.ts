import { CoreRepository } from "../../../ship/core/repository/CoreRepository";
import { User } from "../../user/models/User";
import { Patient } from "../models/Patient";

class PatientRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Patient;
    }

    getPatientById = (id: Number): Promise<Patient> => {
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
}

export const patientRepository = new PatientRepository();
