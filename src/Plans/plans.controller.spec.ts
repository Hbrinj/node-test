import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { CurrencyDto } from './dto/Currency.dto';
import { Currency } from './dto/Currency.enum';
import { Plan } from './entities/plans.entity';

describe('PlansController', () => {
    let getPlans: jest.Mock = jest.fn()
    let plansController: PlansController;

    beforeEach( async() => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PlansController],
            providers: [
                {
                    provide: PlansService,
                    useValue: {
                        getPlans
                    }
                }
            ]
        }).compile();

        plansController = app.get<PlansController>(PlansController)
        getPlans.mockReset()
    });

    describe('GET /plans?currency=', () => {
        it('should return an array of plans', () => {
            // Given
            let currencyDto = { currency: Currency.EUR }
            let plans = new Plan()
            plans.id = "0"
            plans.annualCost = 1
            plans.monthlyCost = 2
            plans.planCode = "gb"
            plans.planName = ""
            getPlans.mockReturnValue([plans])

            // When
            let result = async () => await plansController.getPlans(currencyDto)

            // Then
            expect(result()).resolves.toEqual([plans])
            expect(getPlans).toBeCalledTimes(1)
        });

        it('Errors from service layer are not captured', () => {
            // Given
            let currencyDto = { currency: Currency.EUR }
            getPlans.mockRejectedValue(new Error("oh no!"))

            // When
            let result = async () => await plansController.getPlans(currencyDto)

            // Then
            expect(result()).rejects.toThrow("oh no!")
            expect(getPlans).toBeCalledTimes(1)
        });
    });
});