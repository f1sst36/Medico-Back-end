import { Request } from "express";
import bcrypt from "bcryptjs";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../../user/repositories/UserRepository";
import { sendMailWithConfirmedTask } from "../tasks/SendMailWithConfirmedTask";
import { createNewUserTask } from "../../user/tasks/CreateNewUserTask";
import { createNewPacientTask } from "../../pacient/tasks/CreateNewPacientTask";
import { createNewDoctorTask } from "../../doctor/tasks/CreateNewDoctorTask";

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

        const confirmationToken = await bcrypt.hash(req.body.email, salt);

        const newUser = await createNewUserTask.run({
            name: req.body.name,
            surname: req.body.surname,
            middleName: req.body.middleName,
            age: req.body.age,
            sex: req.body.sex,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
            email: req.body.email,
            hashedPassword: hashedPassword,
            confirmationToken: confirmationToken,
            acceptedUserAgreement: req.body.acceptedUserAgreement,
            userType: req.body.userType,
        });

        if (!newUser) return { error: 1, message: "Ошибка создания пользователя" };

        if (req.body.userType === "doctor") {
            const newDoctor = await createNewDoctorTask.run(newUser.id);
            if (!newDoctor) return { error: 1, message: "Ошибка создания доктора" };
        } else if (req.body.userType === "pacient") {
            const newPacient = await createNewPacientTask.run(newUser.id);
            if (!newPacient) return { error: 1, message: "Ошибка создания пациента" };
        }

        return await sendMailWithConfirmedTask.run(
            newUser.email,
            newUser.name,
            newUser.confirmationToken
        );
    };
}

export const registrationAction = new RegistrationAction();
