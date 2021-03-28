import { DoctorSpecialtiesSeed } from "./DoctorSpecialtiesSeed";
import { PatientsSeed } from "./PatientsSeed";

export class Seeder {
    public static run = () => {
        new DoctorSpecialtiesSeed().run();
        new PatientsSeed().run();
    };
}

// Seeder.run();
