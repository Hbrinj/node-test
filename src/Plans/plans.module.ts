import { Module } from "@nestjs/common";
import { PlansController } from "./plans.controller";
import { PlansService } from "./plans.service";
import { Plan } from "./entities/plans.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurrencyConversionService } from "./CurrencyConversion.service";


@Module({
    imports:[TypeOrmModule.forFeature([Plan])],
    controllers: [PlansController],
    providers: [PlansService, CurrencyConversionService],
})
export class PlansModule {}