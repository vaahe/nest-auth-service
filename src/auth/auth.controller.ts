import { User } from 'src/user/entities/user.entity';
import { AuthenticatedRequest, GeneratedTokens } from 'src/types';
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    signin(@Body() signInDto: SignInDto): Promise<GeneratedTokens> {
        return this.authService.signin(signInDto);
    }

    @Post('signup')
    signup(@Body() signUpDto: SignUpDto): Promise<GeneratedTokens> {
        return this.authService.signup(signUpDto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Req() req: AuthenticatedRequest): Promise<User> {
        return req.user;
    }
}