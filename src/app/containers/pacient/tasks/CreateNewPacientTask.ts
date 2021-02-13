import { CoreTask } from "../../../ship/core/task/CoreTask";
import { Pacient } from "../models/Pacient";

class CreateNewPacientTask extends CoreTask {
    public run = async (id: Number): Promise<Pacient> => {
        return await Pacient.create({
            id: id,
        });
    };
}

export const createNewPacientTask = new CreateNewPacientTask();
