import bcrypt from "bcryptjs";

import { CoreSeed } from "./CoreSeed";
import { User } from "../../../containers/user/models/User";
import { createNewDoctorTask } from "../../../containers/doctor/tasks/CreateNewDoctorTask";
import { format } from "date-fns";

interface IUserParams {
    name: String;
    surname: String;
    middleName: String;
    sex: String;
    birthDate: String;
    phone: String;
    email: String;
    isActivated: Boolean;
    hashedPassword: String;
    confirmationToken: String;
    acceptedUserAgreement: Boolean;
    userType: String;
}

interface IDoctorParams {
    IIN: String;
    experience: String | Date;
    photo: String;
    summary: String;
    diploma: String;
    about: String;
    workplaces: Array<String>;
    education: Array<String>;
    sent: String | Date;
    isVerified: Boolean;
}

export class DoctorsSeed extends CoreSeed {
    private createDoctor = async (userData: IUserParams, doctorData: IDoctorParams) => {
        const newUser = await User.create({
            name: userData.name,
            surname: userData.surname,
            middleName: userData.middleName,
            sex: userData.sex,
            birthDate: userData.birthDate,
            phone: userData.phone,
            email: userData.email,
            isActivated: userData.isActivated,
            password: userData.hashedPassword,
            confirmationToken: userData.confirmationToken,
            acceptedUserAgreement: userData.acceptedUserAgreement,
            userType: userData.userType,
        }).catch((_) => {
            return null;
        });

        const newDoctor = await createNewDoctorTask.run(newUser.id);

        await newDoctor.update(doctorData);
    };

    private arrayRandElement = (arr: Array<any>) => {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    };

    private randomString = (length: Number = 10) => {
        const abc = "abcdefghijklmnopqrstuvwxyz";
        let rs = "";
        while (rs.length < length) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }
        return rs;
    };

    private randomPhone = (length: Number = 11) => {
        const numbers = "1234567890";
        let rs = "";
        while (rs.length < length) {
            rs += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return "+" + rs;
    };

    public run = async () => {
        const salt = await bcrypt.genSalt(10);
        const prefix = "/storage/files/";
        const doctorPhotos = [
            prefix + "doctor_1.jpg",
            prefix + "doctor_2.jpg",
            prefix + "doctor_3.jpg",
            prefix + "doctor_4.jpg",
            prefix + "doctor_5.jpg",
            prefix + "doctor_6.jpg",
        ];
        const names = [
            "Андрей",
            "Сергей",
            "Даниил",
            "Максим",
            "Степан",
            "Влад",
            "Ксения",
            "Ольга",
            "Влад",
            "Анастасия",
            "Иван",
            "Илья",
            "Евгевич",
            "Дмитрий",
            "Георгий",
            "Николай",
            "Мария",
        ];

        for (let i = 0; i < 10; i++) {
            await this.createDoctor(
                {
                    name: this.arrayRandElement(names),
                    surname: "Кличенко",
                    middleName: "Николаевич",
                    sex: Math.random() > 0.5 ? "male" : "female",
                    birthDate: "2000-06-16",
                    phone: this.randomPhone(),
                    email: `${this.randomString(18)}@mail.ru`,
                    isActivated: true,
                    hashedPassword: await bcrypt.hash("Q1w2e3r4", salt),
                    confirmationToken: await bcrypt.hash("1234567890", salt),
                    acceptedUserAgreement: true,
                    userType: "doctor",
                },
                {
                    IIN: "5023 1380 5346 7453",
                    experience: format(new Date(2017, 6, 26), "yyyy-MM-dd"),
                    photo: this.arrayRandElement(doctorPhotos),
                    summary: "/storage/files/summary.jpg",
                    diploma: "/storage/files/diploma.jpg",
                    about: "Я врач - супер головач!",
                    workplaces: [
                        "Саратовчкая клиника под Донбассом",
                        "Центральная поликлинника города Ярославль",
                    ],
                    education: ["Высшее Томбовское образование", "Грамота цетрального округа"],
                    sent: "2021-03-31",
                    isVerified: true,
                }
            );
        }
    };
}
