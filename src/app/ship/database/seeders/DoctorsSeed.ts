import bcrypt from 'bcryptjs';

import { CoreSeed } from './CoreSeed';
import { User } from '../../../containers/user/models/User';
import { createNewDoctorTask } from '../../../containers/doctor/tasks/CreateNewDoctorTask';
import { format } from 'date-fns';
import { DoctorSpecialtiesLink, Review } from '../../../containers/doctor/models';

interface IUserParams {
    name: string;
    surname: string;
    middleName: string;
    sex: string;
    birthDate: string;
    phone: string;
    email: string;
    avatar: string;
    isActivated: boolean;
    hashedPassword: string;
    confirmationToken: string;
    acceptedUserAgreement: boolean;
    userType: string;
}

interface IDoctorParams {
    IIN: string;
    experience: string | Date;
    photo: string;
    summary: string;
    diploma: string;
    about: string;
    workplaces?: Array<string>;
    education?: Array<string>;
    sent: string | Date;
    isVerified: boolean;
    rating: number;
    costOfConsultation: number;
    workTime: string;
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
            avatar: userData.avatar,
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
        for (let i = 0; i < this.randomInt(1, 3); i++) {
            await DoctorSpecialtiesLink.create({
                doctorId: newDoctor.id,
                specialtyId: this.randomInt(1, 16),
            });
        }

        for (let i = 0; i < this.randomInt(2, 16); i++) {
            await Review.create({
                patientId: this.randomInt(1, 2),
                doctorId: newDoctor.id,
                text: 'Какой же классный отзыв я могу оставить этому врачу',
                estimation: this.randomInt(1, 5),
                createdAt: format(
                    new Date(),
                    // this.randomInt(2020, 2021),
                    // this.randomInt(1, 12),
                    // this.randomInt(1, 28)
                    'yyyy-MM-dd'
                ),
            });
        }
    };

    private arrayRandElement = (arr: Array<any>) => {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    };

    private randomString = (length: number = 10) => {
        const abc = 'abcdefghijklmnopqrstuvwxyz';
        let rs = '';
        while (rs.length < length) {
            rs += abc[Math.floor(Math.random() * abc.length)];
        }
        return rs;
    };

    private randomPhone = (length: number = 11) => {
        const numbers = '1234567890';
        let rs = '';
        while (rs.length < length) {
            rs += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return '+' + rs;
    };

    public run = async () => {
        const salt = await bcrypt.genSalt(10);
        const prefix = '/storage/files/';
        const doctorPhotos = [
            prefix + 'doctor_1.jpg',
            prefix + 'doctor_2.jpg',
            prefix + 'doctor_3.jpg',
            prefix + 'doctor_4.jpg',
            prefix + 'doctor_5.jpg',
            prefix + 'doctor_6.jpg',
            prefix + 'doctor_7.jpg',
            prefix + 'doctor_8.jpg',
            prefix + 'doctor_9.jpg',
            prefix + 'doctor_10.jpg',
            prefix + 'doctor_11.jpg',
            prefix + 'doctor_12.jpg',
            prefix + 'doctor_13.jpg',
            prefix + 'doctor_14.jpg',
            prefix + 'doctor_15.jpg',
            prefix + 'doctor_16.jpg',
            prefix + 'doctor_17.jpg',
        ];
        const names = [
            'Андрей',
            'Сергей',
            'Даниил',
            'Максим',
            'Степан',
            'Влад',
            'Ксения',
            'Ольга',
            'Влад',
            'Анастасия',
            'Иван',
            'Илья',
            'Евгевич',
            'Дмитрий',
            'Георгий',
            'Николай',
            'Мария',
        ];

        let randomPhoto: string = this.arrayRandElement(doctorPhotos);
        await this.createDoctor(
            {
                name: 'Максим',
                surname: 'Иванов',
                middleName: 'Сергеевич',
                sex: 'male',
                birthDate: '2000-02-20',
                phone: this.randomPhone(),
                email: `qwe@mail.ru`,
                avatar: randomPhoto,
                isActivated: true,
                hashedPassword: await bcrypt.hash('qwe123Q!', salt),
                confirmationToken: await bcrypt.hash('qwe@mail.ru', salt),
                acceptedUserAgreement: true,
                userType: 'doctor',
            },
            {
                IIN: '502313805346',
                experience: format(
                    new Date(
                        this.randomInt(2000, 2021),
                        this.randomInt(1, 12),
                        this.randomInt(1, 30)
                    ),
                    'yyyy-MM-dd'
                ),
                photo: randomPhoto,
                summary: '/storage/files/summary.jpg',
                diploma: '/storage/files/diploma.jpg',
                about: 'Я врач - не мяч!',
                rating: this.randomInt(1, 5),
                // workplaces: [
                //     'Саратовская клиника под Донбассом',
                //     'Центральная поликлинника города Ярославль',
                // ],
                // education: ['Высшее Томбовское образование', 'Грамота цетрального округа'],
                sent: '2021-03-31',
                isVerified: true,
                costOfConsultation: (Math.round(Math.random() * 12) + 8) * 100,
                workTime: `с ${Math.round(Math.random() * 4) + 8}:00 до ${
                    Math.round(Math.random() * 6) + 14
                }:00`,
            }
        );
        randomPhoto = this.arrayRandElement(doctorPhotos);
        await this.createDoctor(
            {
                name: 'Илья',
                surname: 'Дожленко',
                middleName: 'Андреевич',
                sex: 'male',
                birthDate: '2000-06-16',
                phone: this.randomPhone(),
                email: `ilya@mail.ru`,
                avatar: randomPhoto,
                isActivated: true,
                hashedPassword: await bcrypt.hash('Q1w2e3r4', salt),
                confirmationToken: await bcrypt.hash('ilya@mail.ru', salt),
                acceptedUserAgreement: true,
                userType: 'doctor',
            },
            {
                IIN: '502313805346',
                experience: format(
                    new Date(
                        this.randomInt(2000, 2021),
                        this.randomInt(1, 12),
                        this.randomInt(1, 30)
                    ),
                    'yyyy-MM-dd'
                ),
                photo: randomPhoto,
                summary: '/storage/files/summary.jpg',
                diploma: '/storage/files/diploma.jpg',
                about: 'Я врач - не мяч!',
                rating: this.randomInt(1, 5),
                workplaces: [
                    'Саратовская клиника под Донбассом',
                    'Центральная поликлинника города Ярославль',
                ],
                education: ['Высшее Томбовское образование', 'Грамота цетрального округа'],
                sent: '2021-03-31',
                isVerified: true,
                costOfConsultation: (Math.round(Math.random() * 12) + 8) * 100,
                workTime: `с ${Math.round(Math.random() * 4) + 8}:00 до ${
                    Math.round(Math.random() * 6) + 14
                }:00`,
            }
        );

        for (let i = 0; i < 30; i++) {
            let randomPhoto: string = this.arrayRandElement(doctorPhotos);

            await this.createDoctor(
                {
                    name: this.arrayRandElement(names),
                    surname: 'Кличенко',
                    middleName: Math.random() > 0.1 ? 'Николаевич' : '',
                    sex: Math.random() > 0.5 ? 'male' : 'female',
                    birthDate: '2000-06-16',
                    phone: this.randomPhone(),
                    email: `${this.randomString(18)}@mail.ru`,
                    avatar: randomPhoto,
                    isActivated: true,
                    hashedPassword: await bcrypt.hash('Q1w2e3r4', salt),
                    confirmationToken: await bcrypt.hash('1234567890', salt),
                    acceptedUserAgreement: true,
                    userType: 'doctor',
                },
                {
                    IIN: '502313805346',
                    experience: format(
                        new Date(
                            this.randomInt(2000, 2021),
                            this.randomInt(1, 12),
                            this.randomInt(1, 30)
                        ),
                        'yyyy-MM-dd'
                    ),
                    photo: randomPhoto,
                    summary: '/storage/files/summary.jpg',
                    diploma: '/storage/files/diploma.jpg',
                    about: 'Я врач - супер головач!',
                    rating: this.randomInt(1, 5),
                    workplaces: [
                        'Саратовчкая клиника под Донбассом',
                        'Центральная поликлинника города Ярославль',
                    ],
                    education: ['Высшее Томбовское образование', 'Грамота цетрального округа'],
                    sent: '2021-03-31',
                    isVerified: Boolean(Math.random() >= 0.1),
                    costOfConsultation: (Math.round(Math.random() * 12) + 8) * 100,
                    workTime: `с ${Math.round(Math.random() * 4) + 8}:00 до ${
                        Math.round(Math.random() * 6) + 14
                    }:00`,
                }
            );
        }
    };
}
