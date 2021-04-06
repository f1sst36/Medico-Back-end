import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { doctorRepository } from "../repositories/DoctorRepository";

class GetDoctorsByPaginate extends CoreTask {
    public run = async (page: number, count: number): Promise<IResult> => {
        const doctors = await doctorRepository.getDoctorsByPaginate(page, count);
        const countOfDoctors = await doctorRepository.getCountOfDoctors();

        if (!doctors)
            return {
                error: 1,
                data: null,
                message: "Ошибка получения врачей",
            };

        if (!doctors.length)
            return {
                error: 1,
                data: {
                    items: [],
                    meta: {
                        totalCount: countOfDoctors,
                        pageCount: Math.ceil(countOfDoctors / count),
                        currentPage: page,
                        perPage: count,
                    },
                },
                message: "Врачи не найдены",
            };

        return {
            error: 0,
            data: {
                items: doctors,
                meta: {
                    totalCount: countOfDoctors,
                    pageCount: Math.ceil(countOfDoctors / count),
                    currentPage: page,
                    perPage: count,
                },
            },
            message: "",
        };
    };
}

export const getDoctorsByPaginate = new GetDoctorsByPaginate();
