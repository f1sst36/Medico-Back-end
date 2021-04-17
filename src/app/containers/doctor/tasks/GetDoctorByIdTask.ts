import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { doctorRepository } from "../repositories/DoctorRepository";

class GetDoctorByIdTask extends CoreTask {
    public run = async (id: number): Promise<IResult> => {
        const doctor = await doctorRepository.getVerifiedDoctorById(id);

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
