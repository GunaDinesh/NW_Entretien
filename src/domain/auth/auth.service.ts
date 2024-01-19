import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { User } from "../users/user.entity";
import { jwtSecret } from "../../infrastructure/auth/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const user: User = await this.prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }

        return {
            accessToken: this.jwtService.sign(
                {
                    userId: user.id,
                },
                { secret: jwtSecret },
            ),
        };
    }
}
