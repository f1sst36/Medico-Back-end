import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export const sendMail = async (
    recipient: String,
    subject: String,
    html: String,
) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_LOGIN,
        to: recipient,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) fs.appendFile(__dirname + "/logs/error.txt", JSON.stringify(err) + "\n", () => {});
        if (data)
            fs.appendFile(__dirname + "/logs/success.txt", JSON.stringify(data) + "\n", () => {});
    });
};
