import { CoreTask } from "../../../ship/core/task/CoreTask";
import { User } from "../models/User";

interface IParams {
    name: string;
    surname: string;
    middleName: string;
    sex: string;
    birthDate: string;
    phone: string;
    email: string;
    hashedPassword: string;
    confirmationToken: string;
    acceptedUserAgreement: boolean;
    userType: string;
}

class CreateNewUserTask extends CoreTask {
    public run = async (data: IParams): Promise<User> => {
        return await User.create({
            name: data.name,
            surname: data.surname,
            middleName: data.middleName,
            sex: data.sex,
            birthDate: data.birthDate,
            phone: data.phone,
            email: data.email,
            password: data.hashedPassword,
            confirmationToken: data.confirmationToken,
            acceptedUserAgreement: data.acceptedUserAgreement,
            userType: data.userType,
        }).catch((_) => {
            return null;
        });
    };
}

export const createNewUserTask = new CreateNewUserTask();
