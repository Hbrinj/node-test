import { Injectable } from "@nestjs/common";
import { CreateUserResponse } from "./Response/createUser.response";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./Entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async createAndSaveUser(): Promise<CreateUserResponse> {
        let user = new User();
        user.firstName = "bob"
        await this.userRepository.save(user)
        return new CreateUserResponse(user.id)
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }
}