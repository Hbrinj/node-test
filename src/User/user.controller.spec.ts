import { UserController } from "./user.controller"
import { TestingModule, Test } from "@nestjs/testing";
import { UserService } from "./user.service";

// describe('UserController', () => {
//     let userController: UserController;

//     beforeEach( async() => {
//         const app: TestingModule = await Test.createTestingModule({
//             controllers: [UserController],
//             providers: [UserService]
//         }).compile();

//         userController = app.get<UserController>(UserController)
//     });

//     describe('/user', () => {
//         it('should return an object with an empty UserId', () => {
//             expect(userController.createuser("")).toEqual({userId: ""})
//         });
//     });
// })