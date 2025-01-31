import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        const isValid = this.authService.validateUser(signinDto.username, signinDto.password);

        if (isValid) {
            return { message: "Login successful" };
        } else {
            return { message: "Login failed" };
        }
    }
}