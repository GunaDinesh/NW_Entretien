import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtStrategy, jwtSecret } from "./jwt";

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: { expiresIn: "10d" },
        }),
    ],
    providers: [JwtStrategy],
})
export class AuthProviderModule {}
