import { Injectable } from '@nestjs/common';

@Injectable()
export class PlansService {
    getPlans(): string {
        return "We made it!"
    }
}