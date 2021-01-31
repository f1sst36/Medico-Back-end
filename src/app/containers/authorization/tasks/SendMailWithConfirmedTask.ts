import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { sendMail } from "../../../ship/mail";

import handlebars from "handlebars";
import fs from "fs";

class SendMailWithConfirmedTask extends CoreTask {
    private result: IResult;

    public run = async (
        recipient: String,
        userName: String,
        confirmationToken: String
    ): Promise<IResult> => {
        const html = fs.readFileSync(
            __dirname + "../../../../ship/mail/templates/confirmAccount.html",
            { encoding: "utf-8" }
        );

        if (html) {
            const template = handlebars.compile(html);
            const replacements = {
                username: userName,
                link: process.env.FRONT_APP_URL + "" + confirmationToken,
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
