import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/User/Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Plan } from "src/Plans/entities/plans.entity";

@Injectable()
export class SubscribeService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async putSubscriptions(userId: string, plans: string[]) {
        let user = (await this.getSubscriptions(userId))[0]
        let newPlans = plans.map((plan) => {
            var p = new Plan()
            p.id = plan
            return p;
        })
        user.subscriptions = newPlans
        this.userRepository.save(user)
    }

    async getSubscriptions(userId: string): Promise<User[]> {
        return await this.userRepository.find({relations: ["subscriptions"], where: qb => {
            qb.where('"User"."user_id"=:userId', {userId: userId})
        }})
    }
}