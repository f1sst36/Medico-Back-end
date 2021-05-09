import bcrypt from 'bcryptjs';

import { CoreSeed } from './CoreSeed';
import { createNewPatientTask } from '../../../containers/patient/tasks/CreateNewPatientTask';
import { User } from '../../../containers/user/models/User';

interface IParams {
    name: string;
    surname: string;
    middleName: string;
    sex: string;
    birthDate: string;
    phone: string;
    email: string;
    isActivated: boolean;
    hashedPassword: string;
    confirmationToken: string;
    acceptedUserAgreement: boolean;
    userType: string;
}

export class PatientsSeed extends CoreSeed {
    private createPatient = async (data: IParams) => {
        const newUser = await User.create({
            name: data.name,
            surname: data.surname,
            middleName: data.middleName,
            sex: data.sex,
            birthDate: data.birthDate,
            phone: data.phone,
            email: data.email,
            isActivated: data.isActivated,
            password: data.hashedPassword,
            confirmationToken: data.confirmationToken,
            acceptedUserAgreement: data.acceptedUserAgreement,
            userType: data.userType,
        }).catch((_) => {
            return null;
        });

        // await createNewPatientTask.run(newUser.id);
        const newPatient = await createNewPatientTask.run(newUser.id);

        await newPatient.update({
            weight: '80',
            height: '180',
            bloodType: 'II',
            RHFactor: 'Rh+',
            allergies: null,
            chronicDiseases: null,
            operations: null,
            isSmoker: 'Нет',
            avatar: null,
            isAlcoholic: '1 раз в год',
            badHabits: null,
            bloodTransfusion: 'Нет',
            isFullData: true,
        });
    };

    public run = async () => {
        const salt = await bcrypt.genSalt(10);

        this.createPatient({
            name: 'Илья',
            surname: 'Долженко',
            middleName: 'Андреевич',
            sex: 'male',
            birthDate: '2000-06-16',
            phone: '+79784809172',
            email: 'ilay00@mail.ru',
            isActivated: true,
            hashedPassword: await bcrypt.hash('Q1w2e3r4', salt),
            confirmationToken: await bcrypt.hash('ilay00@mail.ru', salt),
            acceptedUserAgreement: true,
            userType: 'patient',
        });

        this.createPatient({
            name: 'Максим',
            surname: 'Иванов',
            middleName: 'Сергеевич',
            sex: 'male',
            birthDate: '2000-02-15',
            phone: '+79780037912',
            email: 'abc@mail.ru',
            isActivated: true,
            hashedPassword: await bcrypt.hash('qwe123Q!', salt),
            confirmationToken: await bcrypt.hash('abc@mail.ru', salt),
            acceptedUserAgreement: true,
            userType: 'patient',
        });
    };
}
