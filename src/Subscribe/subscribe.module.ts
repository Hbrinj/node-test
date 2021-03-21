import { Module } from "@nestjs/common";
import { SubscribeController } from "./subscribe.controller";
import { SubscribeService } from "./subscribe.service";
import { UserModule } from "src/User/user.module";

@Module({
    imports: [UserModule],
    controllers: [SubscribeController],
    providers: [SubscribeService],
})
export class SubscribeModule {}