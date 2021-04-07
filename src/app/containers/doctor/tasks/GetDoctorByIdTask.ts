import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { doctorRepository } from "../repositories/DoctorRepository";

class GetDoctorByIdTask extends CoreTask {
    public run = async (id: Number): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorById(id);

        if (!doctor)
            return {
                error: 1,
                message: "Доктор не найден",
            };

        return {
            error: 0,
            data: doctor,
            message: "",
        };
    };
}

export const getDoctorByIdTask = new GetDoctorByIdTask();