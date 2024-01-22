import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}
    async sendEmail(
        emailSubject: string,
        emailBody: string,
        receivers: string,
    )
    {
        try {
            this.mailerService.sendMail({
                to: receivers, 
                from: process.env.MAIL,
                subject: emailSubject,
                text: emailBody
            })
            .then((res)=>
                console.log('E-mail sent successfully:', res)
            )
            .catch((err) => {
                console.log('E-mail failed to send:', err)
            })
            
        }
        catch (error) {
            console.error('An error occured while sending the email: ', error);
            throw error;
        }
    };
}
