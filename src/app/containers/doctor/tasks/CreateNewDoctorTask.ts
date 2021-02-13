import { CoreTask } from "../../../ship/core/task/CoreTask";
import { Doctor } from "../models/Doctor";

class CreateNewDoctorTask extends CoreTask {
    public run = async (id: Number): Promise<Doctor> => {
        return await Doctor.create({
            id: id,
        });
    };
}

export const createNewDoctorTask = new CreateNewDoctorTask();
