import { CoreTask } from "../../../ship/core/task/CoreTask";
import { User } from "../models/User";

interface IParams {
    name: String;
    surname: String;
    middleName: String;
    sex: String;
    birthDate: String;
    phone: String;
    email: String;
    hashedPassword: String;
    confirmationToken: String;
    acceptedUserAgreement: Boolean;
    userType: String;
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
