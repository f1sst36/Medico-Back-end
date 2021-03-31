import { DoctorSpecialtiesSeed } from "./DoctorSpecialtiesSeed";
import { DoctorsSeed } from "./DoctorsSeed";
import { PatientsSeed } from "./PatientsSeed";

export class Seeder {
    public static run = () => {
        new DoctorSpecialtiesSeed().run();
        new PatientsSeed().run();
        new DoctorsSeed().run();
    };
}

// Seeder.run();
