import { DoctorSpecialtiesSeed } from './DoctorSpecialtiesSeed';
import { DoctorsSeed } from './DoctorsSeed';
import { PatientsSeed } from './PatientsSeed';
import { CommunicationMethodSeed } from './CommunicationMethodSeed';
import { ConsultationSeed } from './ConsultationSeed';
import { Sequelize } from 'sequelize/types';

export class Seeder {
    public static run = async (sequelize: Sequelize) => {
        await sequelize.sync({ force: true });

        await new DoctorSpecialtiesSeed().run();
        await new PatientsSeed().run();
        await new DoctorsSeed().run();
        await new CommunicationMethodSeed().run();
        // new ConsultationSeed().run();
    };
}
