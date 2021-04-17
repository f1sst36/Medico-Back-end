import { Patient } from '../../../containers/patient/models/Patient';
import { Doctor, Specialties } from '../../../containers/doctor/models';
import { DoctorSpecialtiesSeed } from './DoctorSpecialtiesSeed';
import { DoctorsSeed } from './DoctorsSeed';
import { PatientsSeed } from './PatientsSeed';
import { CommunicationMethodSeed } from './CommunicationMethodSeed';
import { ConsultationSeed } from './ConsultationSeed';

export class Seeder {
    public static run = async () => {
        // await Doctor.sync({ force: true });
        // await Specialties.sync({ force: true });
        // await Patient.sync({ force: true });

        await new DoctorSpecialtiesSeed().run();
        await new PatientsSeed().run();
        await new DoctorsSeed().run();
        await new CommunicationMethodSeed().run();
        new ConsultationSeed().run();
    };
}
