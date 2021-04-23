import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { doctorRepository } from '../repositories/DoctorRepository';

class GetDoctorsByPaginate extends CoreTask {
    public run = async (
        page: number,
        count: number,
        fio: string = '',
        specialtySlug: string = ''
    ): Promise<IResult> => {
        const doctors = await doctorRepository.getDoctorsByPaginate(
            page,
            count,
            fio,
            specialtySlug
        );
        const countOfDoctors = await doctorRepository.getCountOfDoctors(fio, specialtySlug);

        if (!doctors)
            return {
                error: 1,
                data: null,
                message: 'Ошибка получения врачей',
            };

        const meta = {
            totalCount: countOfDoctors,
            pageCount: Math.ceil(countOfDoctors / count),
            currentPage: page,
            perPage: count,
        };

        if (!doctors.length)
            return {
                error: 1,
                data: {
                    items: [],
                    meta: meta,
                },
                message: 'Врачи не найдены',
            };

        return {
            error: 0,
            data: {
                items: doctors,
                meta: meta,
            },
            message: '',
        };
    };
}

export const getDoctorsByPaginate = new GetDoctorsByPaginate();
