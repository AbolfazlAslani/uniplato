"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const user_1 = require("../user");
describe("User Service Tests", () => {
    it("should return user data when id is 1", async () => {
        // create a mock for the User class
        const userMock = sinon_1.default.mock(user_1.User);
        // return a mock user when the getUser function is called with id 1
        userMock.expects("findUser").resolves(newUser(1, "John"));
        // call the findUser function
        constuser: user_1.User = awaitUser.findUser(1);
        // assert that the user id is 1
        chai_1.assert.equal(user.id, 1);
    });
});
