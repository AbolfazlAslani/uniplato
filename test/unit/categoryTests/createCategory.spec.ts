import * as chai from 'chai';
import * as sinon from 'sinon';
import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryController from '../../../src/controllers/category.controller';
import CategoryService from '../../../src/services/categoryService';

const expect = chai.expect;

describe('CategoryController', () => {
    describe('createCategory', () => {
        it('should create a category successfully', async () => {
            // Stub the CategoryService to return some dummy data
            const stubbedCategory = { id: 1, name: 'Category 1' };
            const createCategoryStub = sinon.stub(CategoryService, 'createCategory').resolves(stubbedCategory);

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest = {
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Test Category',
                    counter: 10
                }
            } as FastifyRequest;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.createCategory(requestMock, replyMock);

            // Verify that the CategoryService.createCategory method was called with the correct arguments
            expect(createCategoryStub.calledOnceWithExactly({
                latitude: 123,
                longitude: 456,
                category: 'Test Category',
                counter: 10
            })).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(201)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: "Category Created Successfully!",
                body: stubbedCategory
            })).to.be.true;

            // Restore the stubs to their original state
            createCategoryStub.restore();
        });

        it('should handle errors and return 500 status code', async () => {
            // Stub the CategoryService to throw an error
            const createCategoryStub = sinon.stub(CategoryService, 'createCategory').throws(new Error('Test error'));

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest = {
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Test Category',
                    counter: 10
                }
            } as FastifyRequest;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.createCategory(requestMock, replyMock);

            // Verify that the CategoryService.createCategory method was called with the correct arguments
            expect(createCategoryStub.calledOnceWithExactly({
                latitude: 123,
                longitude: 456,
                category: 'Test Category',
                counter: 10
            })).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;

            // Restore the stubs to their original state
            createCategoryStub.restore();
        });
    });
});
