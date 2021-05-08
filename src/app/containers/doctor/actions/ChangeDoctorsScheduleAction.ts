import { IResult } from 'app/ship/core/task/CoreTask';
import { CoreAction } from '../../../ship/core/action/CoreAction';

interface IScheduleItem {
    dayNumber: number;
    from: number;
    to: number;
}

class ChangeDoctorsScheduleAction extends CoreAction {
    public run = async (doctorId: number, newSchedule: Array<IScheduleItem>): Promise<IResult> => {
        console.log('ChangeDoctorsScheduleAction', newSchedule);

        // Сделать проверку на существование консультаций у врача
        // и запретить ему изменять график если есть активные (waiting or active) консультации

        return {
            error: 0,
            data: { a: 1 },
        };
    };
}

export const changeDoctorsScheduleAction = new ChangeDoctorsScheduleAction();
