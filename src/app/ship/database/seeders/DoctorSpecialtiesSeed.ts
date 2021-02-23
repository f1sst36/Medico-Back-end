import { Specialties } from "../../../containers/doctor/models";
import { CoreSeed } from "./CoreSeed";

export class DoctorSpecialtiesSeed extends CoreSeed {
    public run = () => {
        this.records = [
            {
                name: "Терапевт",
            },
            {
                name: "Хирург",
            },
            {
                name: "Травматолог",
            },
            {
                name: "Эндокринолог",
            },
            {
                name: "Дерматолог",
            },
            {
                name: "Косметолог",
            },
            {
                name: "Уролог",
            },
            {
                name: "Гинеколог",
            },
            {
                name: "Офтальмолог",
            },
            {
                name: "Реабилитолог",
            },
            {
                name: "Дерматовенеролог",
            },
            {
                name: "Иммунолог",
            },
            {
                name: "Педиатр",
            },
            {
                name: "Инфекционист",
            },
            {
                name: "Аллерголог",
            },
            {
                name: "Гастроэнтеролог",
            },
        ];

        Specialties.bulkCreate(this.records);
    };
}
