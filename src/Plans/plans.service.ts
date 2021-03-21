import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Plan } from './entities/plans.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyConversionService } from './CurrencyConversion.service';
import { Currency } from './dto/Currency.enum';

@Injectable()
export class PlansService {
    constructor(
        @InjectRepository(Plan) private plansRepository: Repository<Plan>,
        private currencyConversionService: CurrencyConversionService
    ) { }

    //TODO: this is mucky... defo missing some understanding here
    async getPlans(currency: Currency): Promise<Plan[]> {
        let promise = await Promise.allSettled([
            this.plansRepository.find(),
            this.currencyConversionService.getConversionRateFor(currency)
        ])

        let plans = promise[0]
        let rate = promise[1]

        if (rate.status === "rejected") {
            throw new HttpException("derp", HttpStatus.SERVICE_UNAVAILABLE)
        }

        if (plans.status === "rejected") {
            throw new HttpException("derp", HttpStatus.SERVICE_UNAVAILABLE)
        }
        
        let actualRate = rate.value
        let actualPlans = plans.value
        actualPlans.forEach((plan) => {
            plan["monthlyCost"] = plan["monthlyCost"] * actualRate;
            plan["annualCost"] = plan ["annualCost"] * actualRate;
        })

        return actualPlans;
    }
}