import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator';

enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    @IsEnum(UserRole, { message: 'Role must be either "user" or "admin"' })
    role: UserRole;

    @Column({ unique: true })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    @MaxLength(20, { message: 'Username must not exceed 20 characters' })
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
