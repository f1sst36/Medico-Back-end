import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../../user/repositories/UserRepository";
import { pacientRepository } from "../../pacient/repositories/PacientRepository";
import { doctorRepository } from "../../doctor/repositories/DoctorRepository";

class LoginAction extends CoreAction {
    public run = async (req: Request): Promise<IResult> => {
        const user = await userRepository.getUserByFields({ email: req.body.email });
        if (!user) return { error: 1, message: "Неверный логин или пароль" };

        if (!user.isActivated) return { error: 1, message: "Аккаунт не подтвержден" };

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return { error: 1, message: "Неверный логин или пароль" };

        let fullUser: any = {};
        if (user.userType === "pacient") fullUser = await pacientRepository.getPacientById(user.id);
        else if (user.userType === "doctor")
            fullUser = await doctorRepository.getDoctorById(user.id);

        const token = jwt.sign({ _user: fullUser.dataValues }, process.env.TOKEN_SECRET_KEY);
        return { error: 0, data: token };
    };
}

export const loginAction = new LoginAction();
