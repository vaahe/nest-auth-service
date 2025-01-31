import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    role: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;
}