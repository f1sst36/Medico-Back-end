import { CoreTask, IResult } from "../../../ship/core/task/CoreTask";
import { sendMail } from "../../../ship/mail";

import handlebars from "handlebars";
import fs from "fs";

class SendMailWithConfirmedTask extends CoreTask {
    private readHTMLFile = (path, callback) => {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
            if (err) throw err;
            else callback(null, html);
        });
    };

    public run = async (
        recipient: String,
        userName: String,
        confirmationToken: String
    ): Promise<IResult> => {
        this.readHTMLFile(
            __dirname + "../../../../ship/mail/templates/confirmAccount.html",
            async (_, html) => {
                const template = handlebars.compile(html);
                const replacements = {
                    username: userName,
                    link: process.env.FRONT_APP_URL + "" + confirmationToken,
                };
                const htmlToSend = template(replacements);

                await sendMail(recipient, "Подтверждение аккаунта", htmlToSend);
            }
        );

        return {
            error: 0,
            message: "На указанную почту было выслано письмо с подтверждением аккаунта",
        };
    };
}

export const sendMailWithConfirmedTask = new SendMailWithConfirmedTask();
