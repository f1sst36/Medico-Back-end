import { parseISO } from 'date-fns';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { createConsultationTask } from '../tasks/CreateConsultationTask';
import { getFreeDoctorTimeTask } from '../tasks/GetFreeDoctorTimeTask';

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

        // if (!result.data)
        //     return {
        //         error: result.error,
        //         data: null,
        //         message: result.message,
        //     };

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

        const consultation = await createConsultationTask.run({
            doctorId: doctorId,
            patientId: patientId,
            receptionDate: receptionDateAndTime,
            communicationMethodId: communicationMethodId,
            doctorSpecialtyId: doctorSpecialtyId,
            symptoms: symptoms,
        });

        if (!consultation)
            return {
                error: 1,
                message: 'Ошибка записи на консультацию',
            };

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
