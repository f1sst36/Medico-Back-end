export const emailRegExp = (): RegExp => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
};

export const checkPassword = (password): Boolean => {
    if (password.length < 8) return false;
    if (!password.match(/[A-Z]+/)) return false;
    if (!password.match(/[a-z]+/)) return false;
    if (!/\d/.test(password)) return false;

    return true;
};
