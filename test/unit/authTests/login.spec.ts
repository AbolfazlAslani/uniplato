import * as chai from 'chai';
import * as sinon from 'sinon';
import { FastifyRequest, FastifyReply } from 'fastify';
import AuthController from '../../../src/controllers/auth.controller';
import * as userService from '../../../src/services/userService';
import * as functions from '../../../src/utils/functions';

const expect = chai.expect;

describe('AuthController', () => {
    describe('Login', () => {
        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });

        it('should handle internal server error and return 500 status code', async () => {
            const findUserByEmailStub = sinon.stub(userService, 'findUserByEmail');
            findUserByEmailStub.throws(new Error('Test error'));

            const requestMock: FastifyRequest = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;

            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            await AuthController.Login(requestMock, replyMock);

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

            const requestMock: FastifyRequest = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;

            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            await AuthController.Login(requestMock, replyMock);

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

            const requestMock: FastifyRequest = {
                body: {
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;

            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            await AuthController.Login(requestMock, replyMock);

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
