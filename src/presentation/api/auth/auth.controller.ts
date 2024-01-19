//src/auth/auth.controller.ts

import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../../../domain/auth/auth.service";
import { AuthEntity, LoginDto, Profile } from "./auth.dto";
import { JwtAuthGuard } from "./auth.guard";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() { email, password }: LoginDto) {
        return this.authService.login(email, password);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("me")
    @ApiOkResponse({ type: Profile })
    me(@Request() request) {
        return { email: request.user.email };
    }
}
