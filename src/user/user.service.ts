import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: string): Promise<User> {
        if (!id) {
            throw new BadRequestException('ID is required');
        }

        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async createUser(user: User): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { username: user.username } });

        if (existingUser) {
            throw new BadRequestException(`Username "${user.username}" is already taken`);
        }

        return this.userRepository.save(user);
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        if (!id) {
            return null;
        }

        await this.userRepository.update(id, userData);
        return this.getUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}