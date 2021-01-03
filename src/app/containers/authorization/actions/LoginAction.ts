import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../repositories/UserRepository";

class LoginAction extends CoreAction {
    public run = async (req: Request): Promise<IResult> => {
        const user = await userRepository.getUserByFields({ email: req.body.email });
        if (!user) return { error: 1, message: "Неверный логин или пароль" };

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return { error: 1, message: "Неверный логин или пароль" };

        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET_KEY);
        return { error: 0, data: token };
    };
}

export const loginAction = new LoginAction();
