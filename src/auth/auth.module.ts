import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({ secret: 'fd', signOptions: { expiresIn: '1d' } })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }