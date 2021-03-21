import { Controller, Get, Query } from '@nestjs/common'
import { PlansService } from './plans.service'
import { Plan } from './entities/plans.entity'
import { Currency } from './dto/Currency.enum'
import { CurrencyDto } from './dto/Currency.dto'

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) { }

    @Get()
    async getPlans(@Query() currency: CurrencyDto): Promise<Plan[]> {
        return this.plansService.getPlans(currency.currency)
    }
}