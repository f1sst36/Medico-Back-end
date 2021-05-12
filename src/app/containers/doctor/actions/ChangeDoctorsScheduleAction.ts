import { consultationRepository } from '../../../containers/consultation/repositories/ConsultationRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { doctorRepository } from '../repositories/DoctorRepository';

interface IScheduleItem {
    dayNumber: number;
    from: number;
    to: number;
}

interface ITransformedSchedule {
    dayNumber: number;
    workingHours: Array<number>;
}

class ChangeDoctorsScheduleAction extends CoreAction {
    private createArray = (leftSide: number, rightSide: number): Array<number> => {
        return Array.from({ length: rightSide - leftSide + 1 }, (_, i) => i + leftSide);
    };

    private transformSchedule = (schedule: Array<IScheduleItem>): Array<ITransformedSchedule> => {
        const result: Array<ITransformedSchedule> = [];
        for (let i = 0; i < schedule.length; i++) {
            result.push({
                dayNumber: schedule[i].dayNumber,
                workingHours: this.createArray(schedule[i].from, schedule[i].to),
            });
        }

        return result;
    };

    public run = async (doctorId: number, newSchedule: Array<IScheduleItem>): Promise<IResult> => {
        // const consultations = await consultationRepository.isExistWaitingOrActiveConsultations(
        //     doctorId
        // );

        // if (!consultations)
        //     return {
        //         error: 1,
        //         message: 'Ошибка получения данных',
        //     };

        // if (consultations.length > 0)
        //     return {
        //         error: 2,
        //         message:
        //             'Необходимо завершить все текущие консультации чтобы изменить расписание приема',
        //     };

        const transformedSchedule = this.transformSchedule(newSchedule);
        const resultOfUpdate = await doctorRepository.updateSchedule(doctorId, transformedSchedule);

        if (resultOfUpdate === null)
            return {
                error: 3,
                message: 'Ошибка обновления расписания приема',
            };

        return {
            error: 0,
            data: newSchedule,
            message: 'Расписание приема изменено',
        };
    };
}

export const changeDoctorsScheduleAction = new ChangeDoctorsScheduleAction();
