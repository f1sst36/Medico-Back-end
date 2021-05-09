import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { User } from '../models/User';

interface ITransformedUser {
    name: string;
    surname: string;
    middleName: string;
    birthDate: Date;
    sex: string;
}

class ChangeUserInfoTransformer extends CoreTransformer {
    public transform = (user: User): ITransformedUser => {
        return {
            name: user.getDataValue('name'),
            surname: user.getDataValue('surname'),
            middleName: user.getDataValue('middleName'),
            birthDate: user.getDataValue('birthDate'),
            sex: user.getDataValue('sex'),
        };
    };
}

export const changeUserInfoTransformer = new ChangeUserInfoTransformer();
