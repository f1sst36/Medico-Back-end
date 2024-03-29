import path from "path";
import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { sendMail } from "../../../ship/mail";

import handlebars from "handlebars";
import fs from "fs";

class SendMailWithConfirmedTask extends CoreTask {
    private result: IResult;

    public run = async (
        recipient: string,
        userName: string,
        confirmationToken: string
    ): Promise<IResult> => {
        const html = fs.readFileSync(
            path.join(__dirname, "../../../../app/ship/mail/templates/confirmAccount.html"),
            { encoding: "utf-8" }
        );

        if (html) {
            const template = handlebars.compile(html);
            const replacements = {
                username: userName,
                link:
                    process.env.BACKEND_URL +
                    "/api/v1/auth/confirmation-account?token=" +
                    confirmationToken,
            };
            const htmlToSend = template(replacements);

            await sendMail(recipient, "Подтверждение аккаунта", htmlToSend);

            this.result = {
                error: 0,
                message: "На указанную почту было выслано письмо с подтверждением аккаунта",
            };
        } else {
            this.result = {
                error: 1,
                message: "Ошибка при отправке письма",
            };
        }

        return this.result;
    };
}

export const sendMailWithConfirmedTask = new SendMailWithConfirmedTask();
