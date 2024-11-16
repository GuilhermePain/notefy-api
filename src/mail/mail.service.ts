import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'guizaorocha543@gmail.com',
            pass: process.env.PASS_NODEMAILER
        }
    })

    async sendResetPasswordEmail(email: string, token: string) {
        const resetLink = `http://localhost:3000/auth/reset-password/${token}`

        const mailOptions = {
            from: 'guizarocha543@gmail.com',
            to: email,
            subject: "Redefinir Senha",
            text: resetLink 
        }

        await this.transporter.sendMail(mailOptions);
    }

}
