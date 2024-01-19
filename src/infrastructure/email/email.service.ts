import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor() {}
    sendEmail = (
        emailSubject: string,
        emailBody: string,
        receivers: string[],
    ) => {
        // TODO: Choose an email provider and an email to each receiver
        console.log({ emailSubject, emailBody, receivers });
    };
}
