import { Doctor, Specialty } from '../../doctor/models';
import { User } from '../../user/models/User';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { CommunicationMethod } from '../models/CommunicationMethod';

import { Consultation } from '../models/Consultation';
import { Patient } from '../../patient/models/Patient';
import { addDays } from 'date-fns';

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
                        model: Specialty,
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
                        attributes: ['id', 'photo'],
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

    public getConsultationForCancel = (id: number, userId: number): Promise<Consultation> => {
        try {
            return this.model.findOne({
                where: {
                    id: id,
                    state: 'waiting',
                    [Op.or]: [{ patientId: userId }, { doctorId: userId }],
                },
                attributes: ['id', 'state'],
            });
        } catch (e) {
            return null;
        }
    };

    public getAppointmentsOfConsultationByPatientId = (
        patientId: number
    ): Promise<Array<Consultation>> => {
        try {
            return this.model.findAll({
                where: {
                    patientId: patientId,
                    state: 'done',
                },
                include: [
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
                        attributes: ['id', 'photo'],
                    },
                    {
                        model: Specialty,
                        as: 'doctorSpecialty',
                        attributes: ['name'],
                    },
                ],
                attributes: ['appointment', 'receptionDate'],
            });
        } catch (e) {
            return null;
        }
    };

    public getCountOfConsultationsWithPatientAndDoctor = (
        patientId: number,
        doctorId: number
    ): Promise<number> => {
        try {
            return this.model.count({
                where: {
                    patientId: patientId,
                    doctorId: doctorId,
                },
            });
        } catch (e) {
            return null;
        }
    };

    public getConsultationsForDoctorByDate = (
        doctorId: number,
        startDate: Date,
        endDate: Date,
        state: string
    ): Promise<Array<Consultation>> => {
        try {
            return this.model.findAll({
                where: {
                    doctorId: doctorId,
                    receptionDate: {
                        [Op.between]: [startDate, endDate],
                    },
                    state: state,
                },
                include: [
                    {
                        model: Patient,
                        as: 'patient',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['name', 'surname'],
                            },
                        ],
                        attributes: ['id', 'avatar'],
                    },
                    {
                        model: CommunicationMethod,
                        as: 'communicationMethod',
                        attributes: ['id', 'method'],
                    },
                ],
                attributes: ['id', 'receptionDate', 'isFirstConsultation'],
            });
        } catch (e) {
            return null;
        }
    };

    public consultationByPatientAndDocotrIds = (
        patientId: number,
        doctorId: number,
        consultationId: number
    ): Promise<Consultation> => {
        try {
            return this.model.findOne({
                where: {
                    [Op.or]: [{ state: 'waiting' }, { state: 'active' }],
                    patientId: patientId,
                    doctorId: doctorId,
                    id: consultationId,
                },
                attributes: ['id', 'symptoms'],
            });
        } catch (e) {
            return null;
        }
    };

    public pastPatientConsultations = (patientId: number): Promise<Array<Consultation>> => {
        try {
            return this.model.findAll({
                where: {
                    state: 'done',
                    patientId: patientId,
                },
                include: [
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
                        attributes: ['id'],
                    },
                    {
                        model: Specialty,
                        as: 'doctorSpecialty',
                        attributes: ['id', 'name'],
                    },
                ],
                attributes: ['id', 'receptionDate', 'appointment'],
            });
        } catch (e) {
            return null;
        }
    };

    public getActiveConsultationByIds = (
        doctorId: number,
        patientId: number,
        consultationId: number
    ): Promise<Consultation> => {
        try {
            return this.model.findOne({
                where: {
                    doctorId: doctorId,
                    patientId: patientId,
                    id: consultationId,
                    state: 'active',
                },
                attributes: ['id', 'appointment'],
            });
        } catch (e) {
            return null;
        }
    };

    public getAllConsultationsForRedisByState = (state: string): Promise<Array<Consultation>> => {
        try {
            return this.model.findAll({
                where: {
                    state: state,
                    receptionDate: {
                        [Op.lt]: addDays(new Date().setHours(0, 0, 0, 0), 1),
                    },
                },
                attributes: ['id', 'receptionDate'],
            });
        } catch (e) {
            return null;
        }
    };

    public getConsultationForRedisById = (consultationId: number): Promise<Consultation> => {
        try {
            return this.model.findOne({
                where: {
                    id: consultationId,
                },
                attributes: ['id', 'state', 'receptionDate'],
            });
        } catch (e) {
            return null;
        }
    };

    public isExistWaitingOrActiveConsultations = (
        doctorId: number
    ): Promise<Array<Consultation>> => {
        try {
            return this.model.findAll({
                where: {
                    doctorId: doctorId,
                    [Op.or]: [{ state: 'waiting' }, { state: 'active' }],
                },
            });
        } catch (e) {
            return null;
        }
    };
}

export const consultationRepository = new ConsultationRepository();
