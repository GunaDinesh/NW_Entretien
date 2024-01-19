import { Module } from "@nestjs/common";
import { NotificationService } from "../notifications/notifications.service";
import { EmailModule } from "../../infrastructure/email/email.module";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";

@Module({
    providers: [NotificationService],
    imports: [EmailModule, PrismaModule],
    exports: [NotificationService],
})
export class NotificationsModule {}
