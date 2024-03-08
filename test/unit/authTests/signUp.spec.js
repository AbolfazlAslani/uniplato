"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const sinon = __importStar(require("sinon"));
const auth_controller_1 = __importDefault(require("../../../src/controllers/auth.controller"));
const userService = __importStar(require("../../../src/services/userService"));
const functions = __importStar(require("../../../src/utils/functions"));
const expect = chai.expect;
describe('AuthController', () => {
    describe('signUp', () => {
        it('should create a new user successfully', async () => {
            // Stub the userService createUser method to return some dummy data
            const stubbedUser = { id: 1, name: 'John', lastname: 'Doe', phoneNumber: '123456789', email: 'john.doe@example.com', password: 'hashedPassword' };
            const createUserStub = sinon.stub(userService, 'createUser').resolves(stubbedUser);
            // Stub the hashPassword method to return a hashed password
            const hashPasswordStub = sinon.stub(functions, 'hashPassword').resolves('hashedPassword');
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await auth_controller_1.default.signUp(requestMock, replyMock);
            // Verify that the userService.createUser method was called with the correct arguments
            expect(createUserStub.calledOnceWithExactly({
                name: 'John',
                lastname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
                password: 'hashedPassword',
            })).to.be.true;
            // Verify that the hashPassword method was called with the correct arguments
            expect(hashPasswordStub.calledOnceWithExactly('password123')).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(201)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: 'Created Successfully!',
                body: stubbedUser,
            })).to.be.true;
            // Restore the stubs to their original state
            createUserStub.restore();
            hashPasswordStub.restore();
        });
        it('should handle duplicate email error and return 400 status code', async () => {
            // Stub the userService createUser method to throw an error with code P2002 (duplicate email)
            const createUserStub = sinon.stub(userService, 'createUser').throws({ code: 'P2002' });
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await auth_controller_1.default.signUp(requestMock, replyMock);
            // Verify that the userService.createUser method was called with the correct arguments
            expect(createUserStub.calledOnceWithExactly({
                name: 'John',
                lastname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
                password: sinon.match.any, // The password is not relevant for this test case
            })).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(400)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Email already taken',
            })).to.be.true;
            // Restore the stubs to their original state
            createUserStub.restore();
        });
        it('should handle internal server error and return 500 status code', async () => {
            // Stub the userService createUser method to throw a generic error
            const createUserStub = sinon.stub(userService, 'createUser').throws(new Error('Test error'));
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await auth_controller_1.default.signUp(requestMock, replyMock);
            // Verify that the userService.createUser method was called with the correct arguments
            expect(createUserStub.calledOnceWithExactly({
                name: 'John',
                lastname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
                password: sinon.match.any, // The password is not relevant for this test case
            })).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;
            // Restore the stubs to their original state
            createUserStub.restore();
        });
    });
});
