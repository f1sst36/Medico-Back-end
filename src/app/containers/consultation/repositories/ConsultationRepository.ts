import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';

import { Consultation } from '../models/Consultation';

class ConsultationRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Consultation;
    }

    public getConsultationsInOneDay = (doctorId: number, startDate: Date, endDate: Date): Array<Consultation> => {
        try {
            const result = this.model.findAll({
                where: {
                    doctorId: doctorId,
                    receptionDate: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                attributes: ['id', 'receptionDate'],
            });
            return result;
        } catch (error) {
            return null;
        }
    };
}

export const consultationRepository = new ConsultationRepository();
