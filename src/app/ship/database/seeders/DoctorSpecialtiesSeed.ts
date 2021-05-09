import { Specialty } from '../../../containers/doctor/models';
import { CoreSeed } from './CoreSeed';

export class DoctorSpecialtiesSeed extends CoreSeed {
    public run = async (): Promise<void> => {
        this.records = [
            {
                name: 'Терапевт',
                slug: 'therapist',
            },
            {
                name: 'Хирург',
                slug: 'surgeon',
            },
            {
                name: 'Травматолог',
                slug: 'traumatologist',
            },
            {
                name: 'Эндокринолог',
                slug: 'endocrinologist',
            },
            {
                name: 'Дерматолог',
                slug: 'dermatologist',
            },
            {
                name: 'Косметолог',
                slug: 'cosmetologist',
            },
            {
                name: 'Уролог',
                slug: 'urologist',
            },
            {
                name: 'Гинеколог',
                slug: 'gynecologist',
            },
            {
                name: 'Офтальмолог',
                slug: 'ophtalmologist',
            },
            {
                name: 'Реабилитолог',
                slug: 'rehabilitologist',
            },
            {
                name: 'Дерматовенеролог',
                slug: 'dermatovenereologist',
            },
            {
                name: 'Иммунолог',
                slug: 'immunologist',
            },
            {
                name: 'Педиатр',
                slug: 'pediatrician',
            },
            {
                name: 'Инфекционист',
                slug: 'infectious-disease-specialist',
            },
            {
                name: 'Аллерголог',
                slug: 'allergist',
            },
            {
                name: 'Гастроэнтеролог',
                slug: 'gastroenterologist',
            },
        ];

        await Specialty.bulkCreate(this.records);
    };
}
