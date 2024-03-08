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
const category_controller_1 = __importDefault(require("../../../src/controllers/category.controller"));
const categoryService_1 = __importDefault(require("../../../src/services/categoryService"));
const expect = chai.expect;
describe('CategoryController', () => {
    describe('updateOneCategory', () => {
        it('should update a category successfully', async () => {
            // Stub the CategoryService to return some dummy data
            const stubbedCategory = { id: 1, name: 'Updated Category' };
            const updateOneCategoryStub = sinon.stub(categoryService_1.default, 'updateOneCategory').resolves(stubbedCategory);
            // Stub the findOneCategory method to return an existing category
            const findOneCategoryStub = sinon.stub(categoryService_1.default, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await category_controller_1.default.updateOneCategory(requestMock, replyMock);
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
            const findOneCategoryStub = sinon.stub(categoryService_1.default, 'findOneCategory').resolves(null);
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await category_controller_1.default.updateOneCategory(requestMock, replyMock);
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
            const findOneCategoryStub = sinon.stub(categoryService_1.default, 'findOneCategory').resolves({ id: 1, name: 'Existing Category' });
            // Stub the CategoryService to throw an error during update
            const updateOneCategoryStub = sinon.stub(categoryService_1.default, 'updateOneCategory').throws(new Error('Test error'));
            // Mock FastifyRequest and FastifyReply objects
            const requestMock = {
                params: { id: '1' },
                body: {
                    latitude: 123,
                    longitude: 456,
                    category: 'Updated Category',
                    counter: 20,
                },
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await category_controller_1.default.updateOneCategory(requestMock, replyMock);
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
            const requestMock = {
                params: { id: '1' },
                body: {},
            };
            const replyMock = {
                code: sinon.stub().returnsThis(),
                send: sinon.stub().returnsThis(),
            };
            // Call the method and await the result
            await category_controller_1.default.updateOneCategory(requestMock, replyMock);
            // Verify that the replyMock methods were called with the expected arguments
            expect(replyMock.code.calledOnceWithExactly(400)).to.be.true;
            expect(replyMock.send.calledOnceWithExactly({
                error: 'Please provide valid data for update.',
            })).to.be.true;
        });
    });
});
