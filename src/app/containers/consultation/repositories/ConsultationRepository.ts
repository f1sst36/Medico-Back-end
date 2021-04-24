import { Doctor, Specialties } from '../../doctor/models';
import { User } from '../../user/models/User';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { CommunicationMethod } from '../models/CommunicationMethod';

import { Consultation } from '../models/Consultation';

class ConsultationRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Consultation;
    }

    public getConsultationsInOneDay = (
        doctorId: number,
        startDate: Date,
        endDate: Date
    ): Promise<Array<Consultation>> => {
        try {
            const result = this.model.findAll({
                where: {
                    doctorId: doctorId,
                    state: 'waiting',
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

    public getConsultationsByStateAndPatientId = (
        consultationState: string,
        patientId: number
    ): Promise<Array<Consultation>> => {
        try {
            const result = this.model.findAll({
                where: {
                    patientId: patientId,
                    state: consultationState,
                    // receptionDate: {
                    //     [Op.between]: [startDate, endDate],
                    // },
                },
                include: [
                    {
                        model: CommunicationMethod,
                        as: 'communicationMethod',
                        attributes: ['id', 'method'],
                    },
                    {
                        model: Specialties,
                        as: 'doctorSpecialty',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Doctor,
                        as: 'doctor',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['name', 'surname', 'middleName'],
                            },
                        ],
                        attributes: ['photo'],
                    },
                ],
                attributes: ['id', 'receptionDate'],
                order: [['receptionDate', 'DESC']],
            });
            return result;
        } catch (error) {
            return null;
        }
    };
}

export const consultationRepository = new ConsultationRepository();
