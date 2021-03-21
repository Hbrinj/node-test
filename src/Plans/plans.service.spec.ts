import { PlansService } from "./plans.service";
import { PlansController } from "./plans.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { Currency } from "./dto/Currency.enum";
import { CurrencyConversionService } from "./CurrencyConversion.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Plan } from "./entities/plans.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('PlansService', () => {
    let plansService: PlansService
    let getConversionRateFor: jest.Mock
    let find: jest.Mock;
    beforeEach( async() => {
        find = jest.fn()
        getConversionRateFor = jest.fn()
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PlansController],
            providers: [
                {
                    provide: CurrencyConversionService,
                    useValue: {
                        getConversionRateFor
                    }
                },
                {
                    provide: getRepositoryToken(Plan),
                    useValue: {
                        find
                    },
                },
                PlansService
            ]
        })
        .compile();

        plansService = app.get(PlansService)
    });

    describe('plans', () => {
        it('on a successful request it should return scaled values', async () => {
            // Given
            find.mockReturnValue([{monthlyCost: 1, annualCost: 2}])
            getConversionRateFor.mockReturnValue(1.22)
            let expected = [{monthlyCost: 1.22, annualCost: 2.44}]

            // When
            let result = await plansService.getPlans(Currency.EUR)

            // Then
            expect(result).toEqual(expected)
            expect(find).toBeCalledTimes(1)
            expect(getConversionRateFor).toBeCalledWith("EUR")
            expect(getConversionRateFor).toBeCalledTimes(1)

        });

        it('if no plans does nothing', async () => {
            // Given
            find.mockReturnValue([])
            getConversionRateFor.mockReturnValue(1.22)
            let expected = []

            // When
            let result = await plansService.getPlans(Currency.EUR)

            // Then
            expect(result).toEqual(expected)
            expect(find).toBeCalledTimes(1)
            expect(getConversionRateFor).toBeCalledWith("EUR")
            expect(getConversionRateFor).toBeCalledTimes(1)

        });

        it('on failure to get from the repo it should throw a HTTP Exception', async () => {
            // Given
            find.mockRejectedValue(new Error("oh no!"))
            getConversionRateFor.mockReturnValue(1.22)
            let expectedError = new HttpException("Unable to perform all operations", HttpStatus.SERVICE_UNAVAILABLE)

            // When
            let thing = async () => await plansService.getPlans(Currency.EUR);

            // Then
            expect(thing()).rejects.toThrow(expectedError)
        });

        it('on failure to get from the upstream service it should throw a HTTP Exception', async () => {
            // Given
            find.mockReturnValue([{monthlyCost: 1, annualCost: 2}])
            getConversionRateFor.mockRejectedValue(new Error("oh no!"))
            let expectedError = new HttpException("Unable to perform all operations", HttpStatus.SERVICE_UNAVAILABLE)

            // When
            let thing = async () => await plansService.getPlans(Currency.EUR);

            // Then
            expect(thing()).rejects.toThrow(expectedError)
        });
    });
});