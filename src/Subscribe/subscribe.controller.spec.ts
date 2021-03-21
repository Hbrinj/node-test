import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

describe('PlansController', () => {
    let subscribeController: SubscribeController;
    let putSubscriptions: jest.Mock
    beforeEach( async() => {
        putSubscriptions = jest.fn()
        const app: TestingModule = await Test.createTestingModule({
            controllers: [SubscribeController],
            providers: [
                {
                    provide: SubscribeService,
                    useValue: {
                        putSubscriptions
                    }
                }
            ]
        }).compile();
        subscribeController = app.get<SubscribeController>(SubscribeController)
    });

    it('should return the subscriptions the user has', () => {
        // Given
        let planDto = { plans: ["123"] }

        // When
        let result = subscribeController.addSubscriptions("456", planDto)

        // Then
        expect(putSubscriptions).toBeCalledTimes(1)
    });
});