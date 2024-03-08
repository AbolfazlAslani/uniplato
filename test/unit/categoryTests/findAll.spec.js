import * as chai from 'chai';
import * as sinon from 'sinon';
import CategoryController from '../../../src/controllers/category.controller';
import CategoryService from '../../../src/services/categoryService';
const expect = chai.expect;
describe('CategoryController', () => {
    describe('findAllCategories', () => {
        it('should return all categories successfully', async () => {
            // Stub the CategoryService to return some dummy data
            const stubbedCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
            const findAllCategoriesStub = sinon.stub(CategoryService, 'findAllCategories').resolves(stubbedCategories);
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {};
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await CategoryController.findAllCategories(requestMock, replyMock);
            // Verify that the CategoryService.findAllCategories method was called
            expect(findAllCategoriesStub.calledOnce).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(200)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: "Categories Found Successfully!",
                body: stubbedCategories,
            })).to.be.true;
            // Restore the stubs to their original state
            findAllCategoriesStub.restore();
        });
        it('should handle errors and return 500 status code', async () => {
            // Stub the CategoryService to throw an error
            const findAllCategoriesStub = sinon.stub(CategoryService, 'findAllCategories').throws(new Error('Test error'));
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {};
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await CategoryController.findAllCategories(requestMock, replyMock);
            // Verify that the CategoryService.findAllCategories method was called
            expect(findAllCategoriesStub.calledOnce).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;
            // Restore the stubs to their original state
            findAllCategoriesStub.restore();
        });
    });
});
