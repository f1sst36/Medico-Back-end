import { CoreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { Specialties } from "../models";

type TSpecialty = {
    name: String;
};

class SpecialtiesTransformer extends CoreTransformer {
    public transform = (specialties: Array<Specialties>): Object => {
        let response: Array<String> = [];
        specialties.forEach((specialty: TSpecialty) => {
            response.push(specialty.name);
        });

        return this.getSimpleSuccessResponse("", response);
    };
}

export const specialtiesTransformer = new SpecialtiesTransformer();
