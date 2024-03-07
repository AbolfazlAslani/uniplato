import * as chai from 'chai';
import * as sinon from 'sinon';
import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryController from '../../src/controllers/category.controller';
import CategoryService from '../../src/services/categoryService';

const expect = chai.expect;

describe('CategoryController', () => {
    describe('findOneCategory', () => {
        it('should return a single category successfully', async () => {
            // Stub the CategoryService to return dummy data
            const stubbedCategory = { id: 1, name: 'Category 1' };
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves(stubbedCategory);

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{ Params: { id: string } }> = {
                params: { id: '1' }
            } as FastifyRequest<{ Params: { id: string } }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.findOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(200)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: "Category Found Successfully!",
                body: stubbedCategory,
            })).to.be.true;

            // Restore the stubs to their original state
            findOneCategoryStub.restore();
        });

        it('should handle category not found and return 404 status code', async () => {
            // Stub the CategoryService to return null, indicating category not found
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves(null);

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{ Params: { id: string } }> = {
                params: { id: '1' }
            } as FastifyRequest<{ Params: { id: string } }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.findOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(404)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Category not found'
            })).to.be.true;

            // Restore the stubs to their original state
            findOneCategoryStub.restore();
        });

        it('should handle errors and return 500 status code', async () => {
            // Stub the CategoryService to throw an error
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').throws(new Error('Test error'));

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{ Params: { id: string } }> = {
                params: { id: '1' }
            } as FastifyRequest<{ Params: { id: string } }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.findOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;

            // Restore the stubs to their original state
            findOneCategoryStub.restore();
        });
    });
});
