import * as bcrypt from 'bcrypt';

export class PasswordUtils {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}