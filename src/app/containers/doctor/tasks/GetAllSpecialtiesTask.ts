import { CoreTask } from "../../../ship/core/task/CoreTask";
import { Specialty } from "../models";
import { specialtyRepository } from "../repositories/SpecialtyRepository";

class GetAllSpecialtiesTask extends CoreTask {
    public run = (): Promise<Array<Specialty>> => {
        return specialtyRepository.getSpecialties();
    };
}

export const getAllSpecialtiesTask = new GetAllSpecialtiesTask();
