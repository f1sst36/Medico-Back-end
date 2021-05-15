import { addDays, format, parseISO } from 'date-fns';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { consultationRepository } from '../repositories/ConsultationRepository';

class GetPatientsAppointmentsByDateTask extends CoreTask {
    public run = async (doctorId: number, date: string, state: string): Promise<IResult> => {
        let startDate: Date;
        let endDate: Date;
        try {
            startDate = new Date(format(parseISO(date), 'yyyy-MM-dd'));
            endDate = new Date(format(addDays(startDate, 1), 'yyyy-MM-dd'));
        } catch (e) {
            return {
                error: 2,
                message: 'Ошибка форматирования даты',
            };
        }

        if (startDate < new Date(format(new Date(), 'yyyy-MM-dd')))
            return {
                error: 1,
                message: 'Записи на консультации в переданную дату не найдены',
            };

        // Если параметр state === 'new', то отдаются и waiting и active
        const consultations = await consultationRepository.getConsultationsForDoctorByDate(
            doctorId,
            startDate,
            endDate,
            state
        );

        if (!consultations || !consultations.length)
            return {
                error: 1,
                message: 'Записи на консультации не найдены',
            };

        return {
            error: 0,
            data: consultations,
        };
    };
}

export const getPatientsAppointmentsByDateTask = new GetPatientsAppointmentsByDateTask();
