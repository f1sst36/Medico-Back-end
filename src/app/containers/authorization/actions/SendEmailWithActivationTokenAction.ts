import { userRepository } from "../../../containers/user/repositories/UserRepository";
import { CoreAction, IResult } from "../../../ship/core/action/CoreAction";
import { sendMailWithConfirmedTask } from "../tasks/SendMailWithConfirmedTask";

class SendEmailWithActivationTokenAction extends CoreAction {
    public run = async (email: String): Promise<IResult> => {
        const user = await userRepository.getUserByFields({ email: email });

        if (!user || user.isActivated)
            return {
                error: 1,
                message: "Невозможно отправить письмо",
            };

        return sendMailWithConfirmedTask.run(user.email, user.name, user.confirmationToken);
    };
}

export const sendEmailWithActivationTokenAction = new SendEmailWithActivationTokenAction();
