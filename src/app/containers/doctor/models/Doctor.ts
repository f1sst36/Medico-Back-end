import { format } from 'date-fns';
import { DataTypes } from 'sequelize';

import { CoreModel } from '../../../ship/core/model/CoreModel';
import { User } from '../../user/models/User';

export class Doctor extends CoreModel {
    public readonly id: Number;
    public IIN: String;

    public experience: Date;

    public photo: String;
    public summary: String;
    public diploma: String;
    public about: String;
    // public mainDirections: Array<String>;

    // Данных полей нет в анкете на врача, т.е. они будут пустыми
    public workplaces: Array<String>;
    public education: Array<String>;

    public sent: Date;
    public isVerified: Boolean;

    public rating: Number;
    public costOfConsultation: Number;
    public workTime: String;

    public user: User;

    public transformExperience(): String | Date {
        const currentDate: any = new Date();
        let experience: any;
        try {
            experience = new Date(format(this.experience, 'yyyy-MM-dd'));
        } catch (e) {
            return this.experience;
        }

        const days = Math.abs((currentDate - experience) / (60 * 60 * 24 * 1000));

        let result;

        let years = days / 365;
        if (years < 1) {
            const months = Math.round(days / 30);
            let word = 'месяцев';
            if (months < 1) return 'Отсутствует';
            else if (months === 1) word = 'месяц';
            else if (months >= 2 && months <= 4) word = 'месяца';

            result = `${months} ${word}`;
        } else {
            const years = Math.round(days / 365);
            let word = 'лет';
            if (years === 1) word = 'год';
            else if (years >= 2 && years <= 4) word = 'года';

            result = `${years} ${word}`;
        }

        return result;
    }
}

const workTimeByDayDefault = [
    {
        // 0 - воскресенье, 1 - понедельник
        dayNumber: 0,
        // 9 - 9:00, 14 - 14:00
        workingHours: [10, 11],
    },
    {
        dayNumber: 1,
        workingHours: [9, 10, 11, 12, 14, 15, 16, 17, 18],
    },
    {
        dayNumber: 2,
        workingHours: [9, 10, 11, 12, 14, 15, 16, 17, 18],
    },
    {
        dayNumber: 3,
        workingHours: [9, 10, 11, 12, 14, 15, 16, 17, 18],
    },
    {
        dayNumber: 4,
        workingHours: [9, 10, 11, 12, 14, 15, 16, 17, 18],
    },
    {
        dayNumber: 5,
        workingHours: [9, 10, 11, 12, 14, 15],
    },
    {
        dayNumber: 6,
        workingHours: [10, 11],
    },
];

export const doctorSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    IIN: {
        type: DataTypes.STRING,
    },
    experience: {
        type: DataTypes.DATE,
    },
    photo: {
        type: DataTypes.STRING,
    },
    summary: {
        type: DataTypes.STRING,
    },
    diploma: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.TEXT,
    },
    workplaces: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    education: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    sent: {
        type: DataTypes.DATE,
    },
    isVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
    costOfConsultation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1000,
    },
    workTime: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'с 10:00 до 18:00',
    },
    workTimeByDay: {
        allowNull: false,
        type: DataTypes.JSON,
        defaultValue: workTimeByDayDefault,
    },
};
