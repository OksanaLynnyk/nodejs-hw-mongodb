import nodemailer from 'nodemailer';

import { env } from './env.js';

const transporter = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port: Number(env("SMTP_PORT")),
    auth: {
        user: env("SMTP_USER"),
        pass: env("SMTP_PASSWORD"),
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const sendEmail = (message) => {
    return transporter.sendMail(message);
};