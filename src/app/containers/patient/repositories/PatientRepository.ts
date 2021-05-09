import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { User } from '../../user/models/User';
import { Analysis } from '../models/Analysis';
import { Patient } from '../models/Patient';

class PatientRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Patient;
    }

    public getPatientById = (id: number): Promise<Patient> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'password',
                                'confirmationToken',
                                'id',
                            ],
                        },
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getPatientByIdForToken = (id: number): Promise<Patient> => {
        try {
            const result = this.model.findOne({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: [
                                'createdAt',
                                'updatedAt',
                                'password',
                                'confirmationToken',
                                'id',
                            ],
                        },
                    },
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    public getPatientInfoForConsultation = (patientId: number): Promise<Patient> => {
        try {
            return this.model.findOne({
                where: {
                    id: patientId,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['name', 'surname', 'middleName', 'birthDate'],
                    },
                    {
                        model: Analysis,
                        as: 'analyzes',
                        attributes: ['id', 'name', 'type', 'path', 'analysisDeliveryDate'],
                    },
                ],
                attributes: [
                    'avatar',
                    'height',
                    'weight',
                    'bloodType',
                    'isSmoker',
                    'isAlcoholic',
                    'operations',
                    'bloodTransfusion',
                    'chronicDiseases',
                    'allergies',
                ],
            });
        } catch (e) {
            return null;
        }
    };

    public getPatientForChangeAvatar = (patientId: number): Promise<Patient> => {
        try {
            return this.model.findOne({
                where: {
                    id: patientId,
                },
                attributes: ['id', 'avatar'],
            });
        } catch (e) {
            return null;
        }
    };
}

export const patientRepository = new PatientRepository();
