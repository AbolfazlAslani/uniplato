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
    describe('Login', () => {
        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });
        it('should handle internal server error and return 500 status code', async () => {
            const findUserByEmailStub = sinon.stub(userService, 'findUserByEmail');
            findUserByEmailStub.throws(new Error('Test error'));
            const requestMock = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            await auth_controller_1.default.Login(requestMock, replyMock);
            expect(findUserByEmailStub.calledOnceWithExactly('john.doe@example.com')).to.be.true;
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;
            findUserByEmailStub.restore();
        });
        it('should handle incorrect email or password and return 401 status code', async () => {
            // Stub the userService findUserByEmail method to return a user
            const findUserByEmailStub = sinon.stub(userService, 'findUserByEmail');
            findUserByEmailStub.resolves({
                id: 1,
                name: 'John',
                lastname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
                password: 'hashedPassword',
            });
            // Stub the functions.verifyPassword method to return false
            const verifyPasswordStub = sinon.stub(functions, 'verifyPassword').resolves(false);
            const requestMock = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            await auth_controller_1.default.Login(requestMock, replyMock);
            expect(findUserByEmailStub.calledOnceWithExactly('john.doe@example.com')).to.be.true;
            expect(verifyPasswordStub.calledOnceWithExactly('password123', 'hashedPassword')).to.be.true;
            expect(replyMock.code.calledOnceWithExactly(401)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Incorrect Email or Password',
            })).to.be.true;
            // Restore stubs
            findUserByEmailStub.restore();
            verifyPasswordStub.restore();
        });
        it('should log in successfully with correct credentials', async () => {
            // Stub the userService findUserByEmail method to return a user
            const findUserByEmailStub = sinon.stub(userService, 'findUserByEmail');
            findUserByEmailStub.resolves({
                id: 1,
                name: 'John',
                lastname: 'Doe',
                phoneNumber: '123456789',
                email: 'john.doe@example.com',
                password: 'hashedPassword',
            });
            // Stub the functions.verifyPassword method to return true
            const verifyPasswordStub = sinon.stub(functions, 'verifyPassword').resolves(true);
            // Stub the functions.signJwt method to return a token
            const signJwtStub = sinon.stub(functions, 'signJwt').resolves('jwtToken');
            const requestMock = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            await auth_controller_1.default.Login(requestMock, replyMock);
            expect(findUserByEmailStub.calledOnceWithExactly('john.doe@example.com')).to.be.true;
            expect(verifyPasswordStub.calledOnceWithExactly('password123', 'hashedPassword')).to.be.true;
            expect(signJwtStub.calledOnceWithExactly(1)).to.be.true;
            // Use await for asynchronous code
            await new Promise(resolve => process.nextTick(resolve));
            expect(replyMock.code.calledOnceWithExactly(200)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: 'Logged in Successfully!',
                token: 'jwtToken',
            })).to.be.true;
            // Restore stubs
            findUserByEmailStub.restore();
            verifyPasswordStub.restore();
            signJwtStub.restore();
        });
    });
});
