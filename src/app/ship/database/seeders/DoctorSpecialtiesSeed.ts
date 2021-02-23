import { Specialties } from "../../../containers/doctor/models";
import { CoreSeed } from "./CoreSeed";

export class DoctorSpecialtiesSeed extends CoreSeed {
    public run = () => {
        this.records = [
            {
                name: "Хирург",
            },
            {
                name: "Терапевт",
            },
            {
                name: "Окулист",
            },
            {
                name: "Психиатр",
            },
        ];

        Specialties.bulkCreate(this.records);
    };
}
