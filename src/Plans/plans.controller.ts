import { Controller, Get } from '@nestjs/common'
import { PlansService } from './plans.service'

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) { }

    @Get()
    getPlans(): String {
        return this.plansService.getPlans()
    }
}