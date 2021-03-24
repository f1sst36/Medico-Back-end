import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { userRepository } from "../../user/repositories/UserRepository";

class ConfirmationAccountAction extends CoreAction {
    public run = async (token: any): Promise<IResult> => {
        const user = await userRepository.getUserByConfirmationToken(token);
        if (!user)
            return {
                error: 1,
                message: "Пользователь не найден",
            };

        if (user.isActivated)
            return {
                error: 2,
                message: "Аккаунт уже подтвержден",
            };

        user.isActivated = true;
        user.save();

        return { error: 0, message: "Аккаунт пользователя подтвержден" };
    };
}

export const confirmationAccountAction = new ConfirmationAccountAction();
