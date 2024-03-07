import * as chai from 'chai';
import * as sinon from 'sinon';
import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryController from '../../../src/controllers/category.controller';
import CategoryService from '../../../src/services/categoryService';

const expect = chai.expect;

describe('CategoryController', () => {
    describe('updateOneCategory', () => {
        it('should update a category successfully', async () => {
            // Stub the CategoryService to return some dummy data
            const stubbedCategory = { id: 1, name: 'Updated Category' };
            const updateOneCategoryStub = sinon.stub(CategoryService, 'updateOneCategory').resolves(stubbedCategory);

            // Stub the findOneCategory method to return an existing category
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }> = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            } as FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.updateOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the CategoryService.updateOneCategory method was called with the correct arguments
            expect(updateOneCategoryStub.calledOnceWithExactly(1, {
                latitude: 123,
                longitude: 456,
                category: 'Updated Category',
                counter: 20,
            })).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(200)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: 'Category Updated Successfully!',
                body: stubbedCategory,
            })).to.be.true;

            // Restore the stubs to their original state
            updateOneCategoryStub.restore();
            findOneCategoryStub.restore();
        });

        it('should handle updating a non-existing category and return 404 status code', async () => {
            // Stub the findOneCategory method to return null (category not found)
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves(null);

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }> = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            } as FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.updateOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(404)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Category not found',
            })).to.be.true;

            // Restore the stubs to their original state
            findOneCategoryStub.restore();
        });

        it('should handle errors during update and return 500 status code', async () => {
            // Stub the findOneCategory method to return an existing category
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });

            // Stub the CategoryService to throw an error during update
            const updateOneCategoryStub = sinon.stub(CategoryService, 'updateOneCategory').throws(new Error('Test error'));

            // Mock FastifyRequest and FastifyReply objects
            const requestMock: FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }> = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            } as FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.updateOneCategory(requestMock, replyMock);

            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;

            // Verify that the CategoryService.updateOneCategory method was called with the correct arguments
            expect(updateOneCategoryStub.calledOnceWithExactly(1, {
                latitude: 123,
                longitude: 456,
                category: 'Updated Category',
                counter: 20,
            })).to.be.true;

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;

            // Restore the stubs to their original state
            updateOneCategoryStub.restore();
            findOneCategoryStub.restore();
        });

        it('should handle empty request body and return 400 status code', async () => {
            // Mock FastifyRequest and FastifyReply objects with empty body
            const requestMock: FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }> = {
                params: { id: '1' },
                body: {},
            } as FastifyRequest<{
                Params: { id: string };
                Body: { latitude?: number; longitude?: number; category?: string; counter?: number };
            }>;
            const replyMock: sinon.SinonStubbedInstance<FastifyReply> = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            } as unknown as sinon.SinonStubbedInstance<FastifyReply>;

            // Call the method and await the result
            await CategoryController.updateOneCategory(requestMock, replyMock);

            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(400)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Please provide valid data for update.',
            })).to.be.true;
        });
    });
});
