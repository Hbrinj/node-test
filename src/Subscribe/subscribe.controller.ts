import { Controller, Post, Get, Param } from "@nestjs/common";
import { SubscribeService } from "./subscribe.service";
import { SubscriptionsResponse } from "./Response/getSubscriptions.response";

@Controller('/subscribe')
export class SubscribeController {
    constructor(private readonly subscribeService: SubscribeService) { }

    @Post()
    addSubscriptions() {
        return this.subscribeService.putSubscriptions()
    }

    @Get(":userId")
    getSubscriptions(@Param('userId') userId: string): SubscriptionsResponse {
        return this.subscribeService.getSubscriptions(userId)
    }
}