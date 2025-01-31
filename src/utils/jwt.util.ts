import { JwtService } from "@nestjs/jwt";
import { GeneratedTokens } from "src/types";
import { appConfig } from "src/config/app.config";

export class JwtUtils {
    static generateTokens = (userId: string, jwtService: JwtService): GeneratedTokens => {
        const accessToken = jwtService.sign(
            { userId },
            { secret: appConfig.jwtSecret, expiresIn: appConfig.jwtSecretExpires }
        );

        const refreshToken = jwtService.sign(
            { userId },
            { secret: appConfig.jwtRefreshSecret, expiresIn: appConfig.jwtRefreshExpires }
        );

        return { accessToken, refreshToken };
    }
}