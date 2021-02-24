import { CoreRepository } from "../../../ship/core/repository/CoreRepository";
import { User } from "../../user/models/User";
import { Pacient } from "../models/Pacient";

class PacientRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Pacient;
    }

    getPacientById = (id: Number): Promise<Pacient> => {
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

export const pacientRepository = new PacientRepository();
