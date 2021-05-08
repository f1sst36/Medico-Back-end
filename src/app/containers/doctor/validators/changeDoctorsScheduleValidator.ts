import { checkSchedule } from '../../../ship/helper';

const Validator = require('express-validator');

export const changeDoctorsScheduleValidator = [
    Validator.body('schedule', 'Необходимо указать расписание')
        .custom((schedule) => checkSchedule(schedule))
        .withMessage('Неверный тип расписания'),
];
