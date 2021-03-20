import { Module } from "@nestjs/common";
import { SubscribeController } from "./subscribe.controller";
import { SubscribeService } from "./subscribe.service";

@Module({
    imports: [],
    controllers: [SubscribeController],
    providers: [SubscribeService],
})
export class SubscribeModule {}