import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
    providers: [ArticlesService],
    imports: [PrismaModule, NotificationsModule],
    exports: [ArticlesService],
})
export class ArticlesModule {}
