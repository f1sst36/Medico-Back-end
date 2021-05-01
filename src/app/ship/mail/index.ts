import fs from "fs";
import nodemailer from "nodemailer";

export const sendMail = async (recipient: string, subject: string, html: string) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        // tls: { rejectUnauthorized: false },
        auth: {
            type: "OAuth2",
            user: process.env.MAIL_LOGIN,
            // accessToken: process.env.MAIL_ACCESS_TOKEN,
            // expires: Date.now() + 60000,
            refreshToken: process.env.MAIL_REFRESH_TOKEN,
            clientId: process.env.MAIL_CLIENT_ID,
            clientSecret: process.env.MAIL_CLIENT_SECRET,
            // accessUrl: "https://oauth2.googleapis.com/token"
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
