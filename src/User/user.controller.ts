import { Controller, Post, Body, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserResponse } from "./Response/createUser.response";
import { User } from "./Entities/user.entity";


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createuser(@Body() jsonBody: string) : Promise<CreateUserResponse> {
        return this.userService.createAndSaveUser()
    } 

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }
}