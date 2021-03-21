import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { SubscribeService } from "./subscribe.service";
import { User } from "src/User/Entities/user.entity";
import { PlanDto } from "./dto/Plan.dto";

@Controller('/subscribe')
export class SubscribeController {
    constructor(private readonly subscribeService: SubscribeService) { }

    @Post(":userId")
    addSubscriptions(
        @Param('userId') userId: string,
        @Body() planDto: PlanDto
    ) {
        return this.subscribeService.putSubscriptions(userId, planDto.plans)
    }

    @Get(":userId")
    getSubscriptions(@Param('userId') userId: string): Promise<User[]> {
        return this.subscribeService.getSubscriptions(userId)
    }
}