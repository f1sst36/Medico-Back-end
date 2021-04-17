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
        const startDate: Date = new Date(format(parseISO(date), 'yyyy-MM-dd'));
        const endDate: Date = new Date(format(addDays(startDate, 1), 'yyyy-MM-dd'));

        const consultations = await consultationRepository.getConsultationsInOneDay(
            doctorId,
            startDate,
            endDate
        );

        const doctor = await doctorRepository.getDoctorsWorkTimeByDay(doctorId);

        if (!doctor || !consultations)
            return {
                error: 1,
                message: 'Врач не найден или ошибка поиска консультации',
            };

        const doctorsWorkTime = doctor.getDataValue('workTimeByDay');

        let workingHoursInThatDay: Array<number> = doctorsWorkTime.find(
            (day) => day.dayNumber === startDate.getDay()
        ).workingHours;

        const workingTime: Array<WorkingTime> = [];
        workingHoursInThatDay.forEach((hour: number) => {
            workingTime.push({
                time: `${hour}:00`,
                isClosed: Boolean(
                    consultations.find((consultation) => consultation.getReceptionHours() === hour)
                ),
            });
        });

        return { error: 0, data: workingTime };
    };
}

export const getFreeDoctorTimeAction = new GetFreeDoctorTimeAction();
