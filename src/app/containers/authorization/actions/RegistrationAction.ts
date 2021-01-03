import { Request } from "express";
import bcrypt from "bcryptjs";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

class RegistrationAction extends CoreAction {
    public run = async (req: Request): Promise<IResult> => {
        const user = await userRepository.getUserWithSameEmailOrPhone(
            req.body.email,
            req.body.phone
        );

        if (user)
            return {
                error: 1,
                message: "Пользователь с такой почтой или номером телефона уже существует",
            };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            surname: req.body.surname,
            middleName: req.body.middleName,
            age: req.body.age,
            sex: req.body.sex,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword,
        }).catch((_) => {
            return { error: 1, message: "Ошибка создания пользователя" };
        });

        return { error: 0, message: "Пользователь успешно зарегистрирован" };
    };
}

export const registrationAction = new RegistrationAction();