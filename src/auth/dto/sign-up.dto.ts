import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(admin|user)$/, {
        message: "Role must be either 'admin' or 'user'"
    })
    role: string;
}
