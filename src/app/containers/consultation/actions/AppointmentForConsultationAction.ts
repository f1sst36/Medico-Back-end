import { createChatTask } from '../../../containers/chat/tasks/CreateChatTask';
import { parseISO } from 'date-fns';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { consultationRepository } from '../repositories/ConsultationRepository';
import { createConsultationTask } from '../tasks/CreateConsultationTask';
import { getFreeDoctorTimeTask } from '../tasks/GetFreeDoctorTimeTask';
import { writeConsultationsToRedisTask } from '../tasks/WriteConsultationsToRedisTask';
import { chatRepository } from '../../../containers/chat/repositories/ChatRepository';
import { Chat } from '../../../containers/chat/models/Chat';

interface IWorkingTime {
    time: number;
    isClosed: boolean;
}

class AppointmentForConsultationAction extends CoreAction {
    public run = async (
        doctorId: number,
        patientId: number,
        receptionDate: string,
        communicationMethodId: number,
        doctorSpecialtyId: number,
        symptoms: string
    ): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorsFIO(doctorId);

        if (!doctor)
            return {
                error: 1,
                message: 'Доктор не найден',
            };

        // receptionDate - дата полученная от клиента
        const receptionDateAndTime = new Date(receptionDate);
        receptionDateAndTime.setMinutes(0, 0, 0);

        if (receptionDateAndTime <= new Date())
            return {
                error: 1,
                message: 'Нет приема в это время',
            };

        const result = await getFreeDoctorTimeTask.run(doctorId, receptionDate, false);

        if (result.error)
            return {
                error: result.error,
                message: result.message,
            };

        // doctorsSchedule - распиисание доктора на день в часах
        const doctorsSchedule: Array<IWorkingTime> = result.data;

        const isHaveFreeTime: boolean = Boolean(
            doctorsSchedule.find(
                (hour) => hour.time === receptionDateAndTime.getHours() && !hour.isClosed
            )
        );

        if (!isHaveFreeTime)
            return {
                error: 1,
                message: 'У доктора нет приема на данное время',
            };

        // Кол-во консультаций между текущим пациентом и доктором
        const countOfConsultations =
            await consultationRepository.getCountOfConsultationsWithPatientAndDoctor(
                patientId,
                doctorId
            );

        // Получение чата между врачем и пациентом.
        let chat: Chat;
        try {
            chat = await chatRepository.getChatForAppointmentCreate(patientId, doctorId);
        } catch (e) {
            return {
                error: 1,
                message: 'Ошибка получения чата из БД',
            };
        }
        // Создание чата если его не существует
        if (!chat) {
            chat = await createChatTask.run({
                patientId: patientId,
                doctorId: doctorId,
            });

            if (!chat)
                return {
                    error: 1,
                    message: 'Ошибка создания чата',
                };
        }

        const consultation = await createConsultationTask.run({
            doctorId: doctorId,
            patientId: patientId,
            chatId: chat.getDataValue('id'),
            receptionDate: receptionDateAndTime,
            communicationMethodId: communicationMethodId,
            doctorSpecialtyId: doctorSpecialtyId,
            symptoms: symptoms,
            isFirstConsultation: !countOfConsultations,
        });

        if (!consultation)
            return {
                error: 1,
                message: 'Ошибка записи на консультацию',
            };

        // Записывается в редис только если запись на консультацию сегодня
        // Не работает условие в if
        // if (
        //     new Date(receptionDate).getMonth() === new Date().getMonth() &&
        //     new Date(receptionDate).getHours() === new Date().getHours() &&
        //     new Date(receptionDate).getFullYear() === new Date().getFullYear()
        // ) {
        const writeToRedisResult = await writeConsultationsToRedisTask.run(consultation);
        if (writeToRedisResult.error)
            return {
                error: 1,
                message: writeToRedisResult.message || 'Ошибка записи на консультацию',
            };
        // }

        return {
            error: 0,
            data: {
                consultation: consultation,
                doctor: doctor,
            },
            message: '',
        };
    };
}

export const appointmentForConsultationAction = new AppointmentForConsultationAction();
