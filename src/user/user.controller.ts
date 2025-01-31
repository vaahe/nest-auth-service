import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(): Promise<User[]> {
        try {
            return this.userService.getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    @Get(':id')
    getUserById(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User | null> {
        return this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}