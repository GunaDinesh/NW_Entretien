import { Module } from "@nestjs/common";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { PresentationModule } from "./presentation/presentation.module";
import { EmailModule } from "./infrastructure/email/email.module";

@Module({
    imports: [PrismaModule, PresentationModule, EmailModule],
})
export class AppModule {}
