import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../../user/repositories/UserRepository";
import { patientRepository } from "../../patient/repositories/PatientRepository";
import { doctorRepository } from "../../doctor/repositories/DoctorRepository";

class LoginAction extends CoreAction {
    public run = async (req: Request): Promise<IResult> => {
        const user = await userRepository.getUserByFields({ email: req.body.email });
        if (!user) return { error: 1, message: "Неверный логин или пароль" };

        if (!user.isActivated) return { error: 1, message: "Аккаунт не подтвержден" };

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return { error: 1, message: "Неверный логин или пароль" };

        let fullUser: any = {};
        if (user.userType === "patient") fullUser = await patientRepository.getPatientByIdForToken(user.id);
        else if (user.userType === "doctor")
            fullUser = await doctorRepository.getDoctorByIdForToken(user.id);

        let token;

        try {
            token = await jwt.sign({ _user: fullUser.dataValues }, process.env.TOKEN_SECRET_KEY);
        } catch (e) {
            console.log("LignAction jwt.sign ERROR", e);
            return { error: 1, message: "Ошибка входа" };
        }

        return { error: 0, data: token };
    };
}

export const loginAction = new LoginAction();
