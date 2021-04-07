import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { doctorRepository } from "../repositories/DoctorRepository";

class GetMostExperiencedDoctorsTask extends CoreTask {
    public run = async (count: Number): Promise<IResult> => {
        const doctors = await doctorRepository.getMostExperiencedDoctors(count);

        if (!doctors || !doctors.length)
            return {
                error: 1,
                message: "Доктора не найдены",
            };

        return {
            error: 0,
            data: doctors,
            message: "",
        };
    };
}

export const getMostExperiencedDoctorsTask = new GetMostExperiencedDoctorsTask();
