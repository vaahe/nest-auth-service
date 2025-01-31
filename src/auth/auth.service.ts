import { JwtService } from "@nestjs/jwt";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";

import { GeneratedTokens } from "src/types";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

import { JwtUtils } from "src/utils/jwt.util";
import { PasswordUtils } from 'src/utils/password.util';

import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signin(signInDto: SignInDto): Promise<GeneratedTokens> {
        const { username, password } = signInDto;

        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await PasswordUtils.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        return JwtUtils.generateTokens(user.id, this.jwtService);
    }

    async signup(signUpDto: SignUpDto): Promise<GeneratedTokens> {
        const { username, password, role } = signUpDto;

        const existingUser = await this.userService.getUserByUsername(username);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await PasswordUtils.hashPassword(password);
        const createdUser = await this.userService.createUser({
            username,
            password: hashedPassword,
            role,
        } as User);

        return JwtUtils.generateTokens(createdUser.id, this.jwtService);
    }
}