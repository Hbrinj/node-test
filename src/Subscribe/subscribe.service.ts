import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../User/Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "../Plans/entities/plans.entity";

@Injectable()
export class SubscribeService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async putSubscriptions(userId: string, plans: string[]) {
        let users = null
        try {
            users = await this.getSubscriptions(userId)
        } catch (errors) {
            throw new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
        }
        
        if ( !users || users.length > 1 || !users[0]) {
            throw new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
        }

        let user: User = users[0]
        if( user.subscriptions && user.subscriptions.length > 0) {
            throw new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
        }
        let newPlans = plans.map((plan) => {
            var p = new Plan()
            p.id = plan
            return p;
        })
        user.subscriptions = newPlans
        try {
            await this.userRepository.save(user)
        } catch (errors) {
            throw new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
        }
    }

    async getSubscriptions(userId: string): Promise<User[]> {
        return await this.userRepository.find({relations: ["subscriptions"], where: qb => {
            qb.where('"User"."user_id"=:userId', {userId: userId})
        }})
    }
}