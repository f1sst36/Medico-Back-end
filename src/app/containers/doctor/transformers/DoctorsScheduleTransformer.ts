import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';

interface IWeeklyScheduleItem {
    dayNumber: number;
    workingHours: Array<number>;
}

interface ITransformedResultItem {
    dayNumber: number;
    from: number;
    to: number;
}

class DoctorsScheduleTransformer extends CoreTransformer {
    public transform = (
        weeklySchedule: Array<IWeeklyScheduleItem>
    ): Array<ITransformedResultItem> => {
        const result: Array<ITransformedResultItem> = [];

        for (let i = 0; i < weeklySchedule.length; i++) {
            result.push({
                dayNumber: weeklySchedule[i].dayNumber,
                from: !weeklySchedule[i].workingHours.length
                    ? -1
                    : weeklySchedule[i].workingHours[0],
                to: !weeklySchedule[i].workingHours.length
                    ? -1
                    : weeklySchedule[i].workingHours[weeklySchedule[i].workingHours.length - 1],
            });
        }

        return result;
    };
}

export const doctorsScheduleTransformer = new DoctorsScheduleTransformer();
