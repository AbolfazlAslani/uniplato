import * as chai from 'chai';
import * as sinon from 'sinon';
import CategoryController from '../../../src/controllers/category.controller';
import CategoryService from '../../../src/services/categoryService';
const expect = chai.expect;
describe('CategoryController', () => {
    describe('deleteOneCategory', () => {
        it('should delete a category successfully', async () => {
            // Stub the CategoryService to return a truthy value for category deletion
            const deleteOneCategoryStub = sinon.stub(CategoryService, 'deleteOneCategory').resolves(true);
            // Stub the findOneCategory method to return an existing category
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await CategoryController.deleteOneCategory(requestMock, replyMock);
            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;
            // Verify that the CategoryService.deleteOneCategory method was called with the correct arguments
            expect(deleteOneCategoryStub.calledOnceWithExactly(1)).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(200)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                success: true,
                message: 'Category Deleted Successfully!',
            })).to.be.true;
            // Restore the stubs to their original state
            deleteOneCategoryStub.restore();
            findOneCategoryStub.restore();
        });
        it('should handle deleting a non-existing category and return 404 status code', async () => {
            // Stub the findOneCategory method to return null (category not found)
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves(null);
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await CategoryController.deleteOneCategory(requestMock, replyMock);
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
        it('should handle errors during deletion and return 500 status code', async () => {
            // Stub the findOneCategory method to return an existing category
            const findOneCategoryStub = sinon.stub(CategoryService, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });
            // Stub the CategoryService to throw an error during deletion
            const deleteOneCategoryStub = sinon.stub(CategoryService, 'deleteOneCategory').throws(new Error('Test error'));
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await CategoryController.deleteOneCategory(requestMock, replyMock);
            // Verify that the CategoryService.findOneCategory method was called with the correct arguments
            expect(findOneCategoryStub.calledOnceWithExactly(1)).to.be.true;
            // Verify that the CategoryService.deleteOneCategory method was called with the correct arguments
            expect(deleteOneCategoryStub.calledOnceWithExactly(1)).to.be.true;
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(500)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({ error: 'Internal Server Error' })).to.be.true;
            // Restore the stubs to their original state
            deleteOneCategoryStub.restore();
            findOneCategoryStub.restore();
        });
    });
});
