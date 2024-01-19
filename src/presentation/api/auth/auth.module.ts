import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "../../../infrastructure/prisma/prisma.module";
import { AuthService } from "../../../domain/auth/auth.service";
import { AuthProviderModule } from "../../../infrastructure/auth/auth.module";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule, AuthProviderModule],
    controllers: [AuthController],
    providers: [JwtService, AuthService],
})
export class AuthApiModule {}
