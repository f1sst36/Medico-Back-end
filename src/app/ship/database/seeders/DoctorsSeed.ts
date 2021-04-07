import bcrypt from "bcryptjs";

import { CoreSeed } from "./CoreSeed";
import { User } from "../../../containers/user/models/User";
import { createNewDoctorTask } from "../../../containers/doctor/tasks/CreateNewDoctorTask";
import { format } from "date-fns";
import { DoctorSpecialtiesLink, Review } from "../../../containers/doctor/models";

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
    rating: Number;
    costOfConsultation: Number;
    workTime: String;
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
        for (let i = 0; i < Math.round(Math.random() * 2) + 1; i++) {
            await DoctorSpecialtiesLink.create({
                doctorId: newDoctor.id,
                specialtyId: Math.round(Math.random() * 15) + 1,
            });
        }

        for (let i = 0; i < Math.round(Math.random() * 2) + 1; i++) {
            await Review.create({
                patientId: Math.round(Math.random() * 1) + 1,
                doctorId: newDoctor.id,
                text: "Какой же классный отзыв я могу оставить этому врачу",
                estimation: Math.round(Math.random() * 4) + 1,
                createdAt: format(new Date(), "yyyy-MM-dd"),
            });
        }
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
            prefix + "doctor_7.jpg",
            prefix + "doctor_8.jpg",
            prefix + "doctor_9.jpg",
            prefix + "doctor_10.jpg",
            prefix + "doctor_11.jpg",
            prefix + "doctor_12.jpg",
            prefix + "doctor_13.jpg",
            prefix + "doctor_14.jpg",
            prefix + "doctor_15.jpg",
            prefix + "doctor_16.jpg",
            prefix + "doctor_17.jpg",
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

        for (let i = 0; i < 20; i++) {
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
                    IIN: "502313805346",
                    experience: format(
                        new Date(
                            Math.round(Math.random() * 21) + 2000,
                            Math.round(Math.random() * 11) + 1,
                            Math.round(Math.random() * 29) + 1
                        ),
                        "yyyy-MM-dd"
                    ),
                    photo: this.arrayRandElement(doctorPhotos),
                    summary: "/storage/files/summary.jpg",
                    diploma: "/storage/files/diploma.jpg",
                    about: "Я врач - супер головач!",
                    rating: Math.round(Math.random() * 4) + 1,
                    workplaces: [
                        "Саратовчкая клиника под Донбассом",
                        "Центральная поликлинника города Ярославль",
                    ],
                    education: ["Высшее Томбовское образование", "Грамота цетрального округа"],
                    sent: "2021-03-31",
                    isVerified: Boolean(Math.random() >= 0.1),
                    costOfConsultation: (Math.round(Math.random() * 12) + 8) * 100,
                    workTime: `с ${Math.round(Math.random() * 4) + 8}:00 до ${
                        Math.round(Math.random() * 6) + 14
                    }:00`,
                }
            );
        }

        await this.createDoctor(
            {
                name: "Илья",
                surname: "Дожленко",
                middleName: "Андреевич",
                sex: "male",
                birthDate: "2000-06-16",
                phone: this.randomPhone(),
                email: `ilya@mail.ru`,
                isActivated: true,
                hashedPassword: await bcrypt.hash("Q1w2e3r4", salt),
                confirmationToken: await bcrypt.hash("ilya@mail.ru", salt),
                acceptedUserAgreement: true,
                userType: "doctor",
            },
            {
                IIN: "502313805346",
                experience: format(
                    new Date(
                        Math.round(Math.random() * 21) + 2000,
                        Math.round(Math.random() * 11) + 1,
                        Math.round(Math.random() * 29) + 1
                    ),
                    "yyyy-MM-dd"
                ),
                photo: this.arrayRandElement(doctorPhotos),
                summary: "/storage/files/summary.jpg",
                diploma: "/storage/files/diploma.jpg",
                about: "Я врач - хуяч",
                rating: Math.round(Math.random() * 4) + 1,
                workplaces: [
                    "Саратовчкая клиника под Донбассом",
                    "Центральная поликлинника города Ярославль",
                ],
                education: ["Высшее Томбовское образование", "Грамота цетрального округа"],
                sent: "2021-03-31",
                isVerified: true,
                costOfConsultation: (Math.round(Math.random() * 12) + 8) * 100,
                workTime: `с ${Math.round(Math.random() * 4) + 8}:00 до ${
                    Math.round(Math.random() * 6) + 14
                }:00`,
            }
        );
    };
}