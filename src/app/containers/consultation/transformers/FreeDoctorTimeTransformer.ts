import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';

interface IWorkingTime {
    time: string | number;
    isClosed: boolean;
}

class FreeDoctorTimeTransformer extends CoreTransformer {
    public transform = (schedule: Array<IWorkingTime>) => {
        for (let i = 0; i < schedule.length; i++) {
            if (!schedule[i].isClosed) return schedule;
        }
        return null;
    };
}

export const freeDoctorTimeTransformer = new FreeDoctorTimeTransformer();
