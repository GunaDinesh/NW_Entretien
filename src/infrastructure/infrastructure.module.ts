import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailModule } from "./email/email.module";
import { AuthProviderModule } from "./auth/auth.module";

@Module({
    imports: [PrismaModule, EmailModule, AuthProviderModule],
    exports: [PrismaModule, EmailModule, AuthProviderModule],
})
export class InfrastructureModule {}
