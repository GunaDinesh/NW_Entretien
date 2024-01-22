import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.SMTP,
                auth : {
                    user: process.env.MAIL,
                    pass: process.env.PASSWORD
                },
            },
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
