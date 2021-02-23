import { CoreTask } from "../../../ship/core/task/CoreTask";
import { Specialties } from "../models";
import { specialtiesRepository } from "../repositories/SpecialtiesRepository";

class GetAllSpecialtiesTask extends CoreTask {
    public run = (): Promise<Array<Specialties>> => {
        return specialtiesRepository.getSpecialties();
    };
}

export const getAllSpecialtiesTask = new GetAllSpecialtiesTask();
