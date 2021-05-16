import { Doctor } from '../../doctor/models';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { Chat } from '../models/Chat';
import { User } from '../../user/models/User';
import { Patient } from '../../patient/models/Patient';
import { Message } from '../models/Message';

class ChatRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Chat;
    }

    public getChatList = (userId: number, userType: string): Promise<Array<Chat>> => {
        const whereCondition: any = {};
        const includeUserCondition: any = {
            // model: Doctor | Patient,
            // as: 'doctor' | 'patient',
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'surname', 'avatar'],
                },
            ],
            attributes: ['id'],
        };

        if (userType === 'patient') {
            includeUserCondition.model = Doctor;
            includeUserCondition.as = 'doctor';

            whereCondition.patientId = userId;
        } else if (userType === 'doctor') {
            includeUserCondition.model = Patient;
            includeUserCondition.as = 'patient';

            whereCondition.doctorId = userId;
        } else throw new Error('Ошибка типа пользователя');

        return this.model.findAll({
            where: whereCondition,
            include: [
                includeUserCondition,
                {
                    model: Message,
                    as: 'messages',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'avatar'],
                        },
                    ],
                    attributes: ['id', 'authorId', 'text', 'createdAt'],
                    limit: 1,
                    order: [['id', 'DESC']],
                },
            ],
            attributes: ['id', 'isOpenedAccess'],
        });
    };

    public getChatForAppointmentCreate = (patientId: number, doctorId: number): Promise<Chat> => {
        return this.model.findOne({
            where: {
                patientId: patientId,
                doctorId: doctorId,
            },
            attributes: ['id'],
        });
    };
}

export const chatRepository = new ChatRepository();
