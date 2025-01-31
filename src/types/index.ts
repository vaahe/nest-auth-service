import { Request } from "express";
import { User } from "src/user/entities/user.entity";

export interface GeneratedTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthenticatedRequest extends Request {
    user: User;
}