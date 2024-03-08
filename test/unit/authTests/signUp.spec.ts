import * as chai from 'chai';
import * as sinon from 'sinon';
import { FastifyRequest, FastifyReply } from 'fastify';
import AuthController from '../../../src/controllers/auth.controller';
import * as userService from '../../../src/services/userService';
import * as functions from '../../../src/functions/functions';

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
            const requestMock: FastifyRequest = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await AuthController.signUp(requestMock, replyMock);

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
            const requestMock: FastifyRequest = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await AuthController.signUp(requestMock, replyMock);

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
            const requestMock: FastifyRequest = {
                body: {
                    name: 'John',
                    lastname: 'Doe',
                    phoneNumber: '123456789',
                    email: 'john.doe@example.com',
                    password: 'password123',
                },
            } as FastifyRequest;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await AuthController.signUp(requestMock, replyMock);

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
