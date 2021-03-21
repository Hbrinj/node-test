import { TestingModule, Test } from "@nestjs/testing"
import { SubscribeController } from "./subscribe.controller"
import { getRepositoryToken } from "@nestjs/typeorm"
import { SubscribeService } from "./subscribe.service"
import { HttpException, HttpStatus } from "@nestjs/common"
import { User } from "../User/Entities/user.entity"
import { Any } from "typeorm"


describe('Subscribe Service', () => {
    let subscribeService: SubscribeService
    let find: jest.Mock
    let save: jest.Mock

    beforeEach(async () => {
        find = jest.fn()
        save = jest.fn()

        const app: TestingModule = await Test.createTestingModule({
            controllers: [SubscribeController],
            providers: [
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        find,
                        save
                    }
                },
                SubscribeService
            ]
        })
        .compile();
        subscribeService = app.get<SubscribeService>(SubscribeService)
    })

    describe('put subcriptions ', () => {
        it('on find failure throw error', () => {
            // Given
            find.mockRejectedValue(new Error("Something went wrong with the Database"));
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).rejects.toThrowError(expectedException)
            expect(find).toBeCalledTimes(1)
            expect(save).toBeCalledTimes(0)
        });

        it('on multiple found users return error', () => {
            // Given
            let users = [{id: 1, firstName: "bob"}, {id: 2, firstName: "bob"}]
            find.mockResolvedValue(users);
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).rejects.toThrowError(expectedException)
            expect(find).toBeCalledTimes(1)
            expect(save).toBeCalledTimes(0)
        });

        it('on no users found', () => {
            // Given
            let users = []
            find.mockResolvedValue(users);
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).rejects.toThrowError(expectedException)
            expect(find).toBeCalledTimes(1)
            expect(save).toBeCalledTimes(0)
        });

        it('on save throws an exception', () => {
            // Given
            let users = [{id: 1, firstName: "bob"}]
            find.mockResolvedValue(users);
            save.mockRejectedValue(Error("Oh no!"))
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let expectedUser = {id: 1, firstName: "bob", subcriptions: [{id:"456"}, {id: "789"}]}
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).rejects.toThrowError(expectedException)
            expect(find).toBeCalledTimes(1)
        });

        it('on user found with existing subscriptions', () => {
            // Given
            let users = [
                {
                    id: 1, 
                    firstName: "bob", 
                    subscriptions: [{id: "1234"}]
                }
            ]
            find.mockResolvedValue(users);
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).rejects.toThrowError(expectedException)
            expect(find).toBeCalledTimes(1)
            expect(save).toBeCalledTimes(0)
        });

        it('successfully saves', () => {
            // Given
            let users = [{id: 1, firstName: "bob"}]
            find.mockResolvedValue(users);
            save.mockResolvedValue(Any)
            let expectedException = new HttpException("Unable to add subscriptions", HttpStatus.BAD_REQUEST)
            let expectedUser = {id: 1, firstName: "bob", subcriptions: [{id:"456"}, {id: "789"}]}
            let plans = ["456", "789"]

            // When
            let result = async () => await subscribeService.putSubscriptions("123", plans)

            // Then
            expect(result()).resolves.not.toThrowError()
            expect(find).toBeCalledTimes(1)
        });

    })

    // Happy path
    // 
})