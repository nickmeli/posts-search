import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { SessionService } from 'src/services/session/session.service';
import { LoginRequest, LoginResponse } from '../../../../shared/schema/LoginRequest';
import { User } from '../../../../shared/schema/User';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly sessionService: SessionService,
    ) {}

    @Get()
    async home(): Promise<string> {
        return 'Auth home';
    }

    @Post('login')
    async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        const user: User = this.authService.login(request);
        if (!user) {
            throw new Error('User not found');
        }

        return {
            user,
            sid: this.sessionService.encodeSid(user)
        };
    }
}
