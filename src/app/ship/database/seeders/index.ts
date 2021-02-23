import { DoctorSpecialtiesSeed } from "./DoctorSpecialtiesSeed";

export class Seeder {
    public static run = () => new DoctorSpecialtiesSeed().run();
}

Seeder.run();
