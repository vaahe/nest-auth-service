import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(20, { message: 'Username must not exceed 20 characters' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(3, { message: 'Password must be at least 3 characters long' })
    password: string;
}
