import { format, parseISO } from 'date-fns';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { createConsultationTask } from '../tasks/CreateConsultationTask';

class AppointmentForConsultationAction extends CoreAction {
    public run = async (
        doctorId: number,
        patientId: number,
        receptionDate: Date,
        communicationMethodId: number,
        symptoms: string
    ): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorsFIOAndWorkTimeJson(doctorId);

        if (!doctor)
            return {
                error: 1,
                message: 'Доктор не найден',
            };

        // receptionDate - дата полученная от клиента
        const receptionDateAndTime = parseISO(String(receptionDate));
        receptionDateAndTime.setMinutes(0, 0, 0);
        // const currentDate = new Date();

        // doctorsScheduleToday - раписание доктора на сегодня в часах
        // const doctorsScheduleToday: Array<number> = doctor.workTimeByDay.find(
        //     (day) => day.dayNumber === receptionDateAndTime.getDay()
        // ).workingHours;



        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Сделай GetFreeDoctorTimeAction таском и вызывай его здесь. Получишь массив свободного/занятого времени



        // 
        // const freeTime: boolean = Boolean(
        //     doctorsScheduleToday.find((hour) => hour === receptionDateAndTime.getHours())
        // );

        // if (!freeTime || receptionDateAndTime <= currentDate)
        //     return {
        //         error: 1,
        //         message: 'У доктора отсутствует текущее время для записи',
        //     };

        const consultation = await createConsultationTask.run({
            doctorId: doctorId,
            patientId: patientId,
            receptionDate: receptionDateAndTime,
            communicationMethodId: communicationMethodId,
            symptoms: symptoms,
        });

        console.log('consultation', consultation.getDataValue("receptionDate").getHours());

        if (!consultation)
            return {
                error: 1,
                message: 'Ошибка записи на консультацию',
            };

        return {
            error: 0,
            data: consultation,
            message: '',
        };
    };
}

export const appointmentForConsultationAction = new AppointmentForConsultationAction();
