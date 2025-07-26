import { IemailService } from "../../domain/interface/serviceInterfaces/emailServiceInterface";
import nodemailer from 'nodemailer'
import { otpEmailTemplate } from "../../templates/otpTemplate";
export class EmailService implements IemailService {
    private transporter: nodemailer.Transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })
    
    }
    async sendEmailOtp(email: string, otp: string): Promise<void> {
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Your OTP Code",
            html: otpEmailTemplate(otp)
        }
        try {
            await this.transporter.sendMail(mailOptions)
            console.log(`OTP Sended To ${email}`)
        } catch (error) {
            console.log('error while sending otp', error)
            throw new Error(error instanceof Error ? error.message : 'error while sending otp')
        }
    }
}