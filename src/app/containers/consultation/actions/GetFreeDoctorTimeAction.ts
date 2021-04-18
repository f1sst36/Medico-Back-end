import { Request } from 'express';

import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { addDays, format, parseISO } from 'date-fns';
import { consultationRepository } from '../repositories/ConsultationRepository';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';

interface WorkingTime {
    time: string;
    isClosed: boolean;
}

class GetFreeDoctorTimeAction extends CoreAction {
    public run = async (doctorId: number, date: string): Promise<IResult> => {
        // date: string это дата, которую хочет выбрать пациент для консультации
        const currentDate: Date = new Date();
        let startDate: Date = new Date(format(parseISO(date), 'yyyy-MM-dd'));
        let isToday: Boolean = false;

        // Если передается в get параметр старая дата (меньше или равно текущей), 
        // то мы будем работать и отдавать ответ как будто передали текущую дату
        if (startDate <= new Date(format(currentDate, 'yyyy-MM-dd'))) {
            startDate = new Date(format(currentDate, 'yyyy-MM-dd'));
            isToday = true;
        }

        const endDate: Date = new Date(format(addDays(startDate, 1), 'yyyy-MM-dd'));

        // В этом методе достаются все консультации врача (которые не отменены, не идут в текущий момент и не завершены)
        // в период от указаной даты (date) до date + 24 часа
        const consultations = await consultationRepository.getConsultationsInOneDay(
            doctorId,
            startDate,
            endDate
        );

        // Получаем доктора с одним полем workTimeByDay, в котором json дней недели и часов в которые доктор предпочитает работать
        // На будущее - запрети изменять доктору его расписание если у него назначены конультации
        const doctor = await doctorRepository.getDoctorsWorkTimeByDay(doctorId);

        if (!doctor || !consultations)
            return {
                error: 1,
                message: 'Врач не найден или ошибка поиска консультации',
            };

        const doctorsWorkTime = doctor.getDataValue('workTimeByDay');

        // Получаем часы из расписания доктора на заданный день (date)
        let workingHoursInThatDay: Array<number> = doctorsWorkTime.find(
            (day) => day.dayNumber === startDate.getDay()
        ).workingHours;

        if (!workingHoursInThatDay.length)
            return { error: 0, data: null, message: 'У врача нет приемов в этот день' };

        const workingTime: Array<WorkingTime> = [];
        workingHoursInThatDay.forEach((hour: number) => {
            workingTime.push({
                time: `${hour}:00`,
                isClosed:
                    Boolean(
                        consultations.find(
                            (consultation) => consultation.getReceptionHours() === hour
                        )
                    ) ||
                    (isToday && hour <= currentDate.getHours()),
            });
        });

        return { error: 0, data: workingTime, message: '' };
    };
}

export const getFreeDoctorTimeAction = new GetFreeDoctorTimeAction();
