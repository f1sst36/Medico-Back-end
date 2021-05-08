export const emailRegExp = (): RegExp => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
};

export const checkPassword = (password): boolean => {
    if (password.length < 8) return false;
    if (!password.match(/[A-Z]+/)) return false;
    if (!password.match(/[a-z]+/)) return false;
    if (!/\d/.test(password)) return false;

    return true;
};

export const checkSchedule = (schedule: Array<any>): boolean => {
    if (!Array.isArray(schedule)) return false;
    if (schedule.length !== 7) return false;

    const dayNumbers: Array<number> = [];

    for (let i = 0; i < schedule.length; i++) {
        schedule[i].dayNumber = +schedule[i].dayNumber;
        schedule[i].from = +schedule[i].from;
        schedule[i].to = +schedule[i].to;

        dayNumbers.push(schedule[i].dayNumber);

        if (
            !schedule[i].hasOwnProperty('dayNumber') ||
            isNaN(schedule[i].dayNumber) ||
            !Number.isInteger(schedule[i].dayNumber) ||
            schedule[i].dayNumber < 0 ||
            schedule[i].dayNumber > 6
        )
            return false;
        if (
            !schedule[i].hasOwnProperty('from') ||
            isNaN(schedule[i].from) ||
            !Number.isInteger(schedule[i].from) ||
            schedule[i].from < 8 ||
            schedule[i].from > 20
        )
            return false;
        if (
            !schedule[i].hasOwnProperty('to') ||
            isNaN(schedule[i].to) ||
            !Number.isInteger(schedule[i].to) ||
            schedule[i].to < 9 ||
            schedule[i].to > 21
        )
            return false;

        if (schedule[i].from >= schedule[i].to) return false;
    }

    if (JSON.stringify(dayNumbers) !== JSON.stringify([1, 2, 3, 4, 5, 6, 0])) return false;

    return true;
};
