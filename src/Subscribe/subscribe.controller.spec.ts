import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

describe('PlansController', () => {
    let subscribeController: SubscribeController;

    beforeEach( async() => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [SubscribeController],
            providers: [SubscribeService]
        }).compile();

        subscribeController = app.get<SubscribeController>(SubscribeController)
    });

    //TODO: go an actually assert some things here
    describe('/subscribe', () => {
        it('Should make a call to check if the customer has plans', () => {
            expect(subscribeController.addSubscriptions())
        });

        it('Should return a 400 if they already have a plan', () => {
            expect(subscribeController.addSubscriptions())
        });

        it('Should add plans if they dont have any', () => {
            expect(subscribeController.addSubscriptions())
        });
    });

    describe('/subscribe/{UserId}', () => {
        it('should return the subscriptions the user has', () => {
            expect(subscribeController.getSubscriptions("123")).toEqual({subscriptions: "123"})
        });
    });
});