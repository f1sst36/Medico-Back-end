import { addDays, format, parseISO } from 'date-fns';
import { consultationRepository } from '../repositories/ConsultationRepository';
import { doctorRepository } from '../../doctor/repositories/DoctorRepository';
import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { start } from 'pm2';

interface IWorkingTime {
    time: string | number;
    isClosed: boolean;
}

class GetFreeDoctorTimeTask extends CoreTask {
    public run = async (
        doctorId: number,
        date: string,
        transformTimeToString: boolean = true
    ): Promise<IResult> => {
        // date: string это дата, которую хочет выбрать пациент для консультации
        const currentDate: Date = new Date();
        // let startDate: Date = new Date(format(parseISO(date), 'yyyy-MM-dd'));
        let startDate: Date = new Date(date);

        const offsetInMinutes = startDate.getTimezoneOffset();
        console.log('offsetInMinutes', offsetInMinutes);

        startDate.setMinutes(startDate.getMinutes() + offsetInMinutes);
        console.log('before startDate', startDate, startDate.getDate(), startDate.getHours());
        startDate.setHours(0, 0, 0, 0);

        console.log('date from client', date);
        console.log('currentDate', currentDate, currentDate.getDate(), currentDate.getHours());
        console.log('startDate', startDate, startDate.getDate(), startDate.getHours());

        let isEarly: Boolean = false;
        let isToday: Boolean = false;

        if (startDate < new Date(format(currentDate, 'yyyy-MM-dd'))) {
            // startDate = new Date(format(currentDate, 'yyyy-MM-dd'));
            isEarly = true;
        }

        const endDate: Date = new Date(format(addDays(startDate, 1), 'yyyy-MM-dd'));

        if (currentDate >= startDate && currentDate < endDate) isToday = true;

        // В этом методе достаются все консультации врача (которые не отменены, не идут в текущий момент и не завершены)
        // в период от указаной даты (date) до date + 24 часа
        const consultations = await consultationRepository.getConsultationsInOneDay(
            doctorId,
            startDate,
            endDate
        );

        // Получаем доктора с одним полем weeklySchedule, в котором json дней недели и часов в которые доктор предпочитает работать
        // На будущее - запрети изменять доктору его расписание если у него назначены конультации
        const doctor = await doctorRepository.getDoctorsWeeklySchedule(doctorId);

        if (!doctor || !consultations)
            return {
                error: 1,
                message: 'Врач не найден или ошибка поиска консультации',
            };

        const doctorsWorkTime = doctor.getDataValue('weeklySchedule');

        // Получаем часы из расписания доктора на заданный день (date)
        let workingHoursInThatDay: Array<number> = doctorsWorkTime.find(
            (day) => day.dayNumber === startDate.getDay()
        ).workingHours;

        if (!workingHoursInThatDay.length)
            return { error: 2, message: 'У врача нет приемов в этот день' };

        const workingTime: Array<IWorkingTime> = [];

        workingHoursInThatDay.forEach((hour: number) => {
            workingTime.push({
                time: transformTimeToString ? `${hour}:00` : hour,
                isClosed:
                    Boolean(
                        consultations.find(
                            (consultation) => consultation.getReceptionHours() === hour
                        )
                    ) ||
                    (isToday && hour <= currentDate.getHours()) ||
                    Boolean(isEarly),
            });
        });

        return { error: 0, data: workingTime, message: '' };
    };
}

export const getFreeDoctorTimeTask = new GetFreeDoctorTimeTask();
