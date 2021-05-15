import { format } from 'date-fns';

const Validator = require('express-validator');

export const patientsAppointmentsByDateValidator = [
    Validator.query('date', 'Необходимо указать дату')
        .trim()
        .isISO8601()
        // .isAfter(format(new Date(), 'yyyy-MM-dd'))
        .withMessage('Неверный формат даты'),
    Validator.query('state', 'Необходимо указать состояние')
        .trim()
        .isIn(['new', 'done'])
        .withMessage("Состояние может быть только 'new' или 'done'"),
];
