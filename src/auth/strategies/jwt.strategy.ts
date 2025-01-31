import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: { userId: string }): Promise<User> {
        const user = await this.userService.getUserById(payload.userId);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        return user;
    }
}