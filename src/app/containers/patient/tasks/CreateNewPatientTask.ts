import { CoreTask } from "../../../ship/core/task/CoreTask";
import { Patient } from "../models/Patient";

class CreateNewPatientTask extends CoreTask {
    public run = async (id: number): Promise<Patient> => {
        return await Patient.create({
            id: id,
        });
    };
}

export const createNewPatientTask = new CreateNewPatientTask();
