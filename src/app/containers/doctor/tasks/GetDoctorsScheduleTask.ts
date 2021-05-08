import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { doctorRepository } from '../repositories/DoctorRepository';

class GetDoctorsScheduleTask extends CoreTask {
    public run = async (doctorId: number): Promise<IResult> => {
        const doctorWithSchedule = await doctorRepository.getDoctorsWeeklySchedule(doctorId);

        if (!doctorWithSchedule)
            return {
                error: 1,
                message: 'Расписание доктора не найдено',
            };

        return {
            error: 0,
            data: doctorWithSchedule.weeklySchedule,
        };
    };
}

export const getDoctorsScheduleTask = new GetDoctorsScheduleTask();
