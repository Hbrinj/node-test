import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

describe('PlansController', () => {
    let plansController: PlansController;

    beforeEach( async() => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PlansController],
            providers: [PlansService]
        }).compile();

        plansController = app.get<PlansController>(PlansController)
    });

    describe('/plans', () => {
        it('should return "We made it!"', () => {
            expect(plansController.getPlans()).toBe("We made it!")
        });
    });

});