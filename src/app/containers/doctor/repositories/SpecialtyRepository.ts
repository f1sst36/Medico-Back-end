import { Op } from "sequelize";
import { CoreRepository } from "../../../ship/core/repository/CoreRepository";

import { Specialty } from "../models";

class SpecialtyRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Specialty;
    }

    public getSpecialties = (): Promise<Array<Specialty>> => {
        try {
            const result = this.model.findAll({ attributes: ["id", "name", "slug"] });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getSpecialtiesByIds = (specialties: Array<Number>): Promise<Array<Specialty>> => {
        try {
            const result = this.model.findAll({
                attributes: ["id", "name", "slug"],
                where: { id: { [Op.in]: specialties } },
            });
            return result;
        } catch (error) {
            return null;
        }
    };
}

export const specialtyRepository = new SpecialtyRepository();
