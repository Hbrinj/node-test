import { Injectable } from "@nestjs/common";
import { SubscriptionsResponse } from "./Response/getSubscriptions.response";

@Injectable()
export class SubscribeService {
    putSubscriptions() {
    }

    getSubscriptions(userId: string): SubscriptionsResponse {
        return new SubscriptionsResponse(userId)
    }
}