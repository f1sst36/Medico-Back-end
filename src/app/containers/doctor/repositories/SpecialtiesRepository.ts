import { Op } from "sequelize";
import { CoreRepository } from "../../../ship/core/repository/CoreRepository";

import { Specialties } from "../models";

class SpecialtiesRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Specialties;
    }

    getSpecialties = (): Promise<Array<Specialties>> => {
        try {
            const result = this.model.findAll({ attributes: ["id", "name", "slug"] });
            return result;
        } catch (error) {
            return null;
        }
    };
}

export const specialtiesRepository = new SpecialtiesRepository();
