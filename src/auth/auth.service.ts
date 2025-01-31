import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    async validateUser(username: string, password: string): Promise<any> {
        if (username === 'admin' && password === 'admin') {
            return { username: 'admin' };
        }

        return null;
    }

    async signin(username: string, password: string): Promise<any> {
        return this.validateUser(username, password);
    }
}