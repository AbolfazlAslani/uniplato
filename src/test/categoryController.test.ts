import * as chai from 'chai';
import { describe, it } from 'mocha';
import { FastifyInstance } from 'fastify';
import * as sinon from 'sinon';
import CategoryController from '../controllers/category.controller';
import CategoryService from '../services/categoryService';

const { expect } = chai;

describe('CategoryController', () => {
  describe('findOneCategory', () => {
    it('should return a category when it exists', async () => {
      // Arrange
      const categoryId = 1;
      const categoryData = {
        // mock category data
        id: categoryId,
        name: 'Test Category',
      };

      const request = {
        params: { id: categoryId.toString() },
      };

      const reply = {
        code: sinon.stub(),
        send: sinon.stub(),
      };

      sinon.stub(CategoryService, 'findOneCategory').resolves(categoryData);

      // Act
      await CategoryController.findOneCategory(request as any, reply as any);

      // Assert
      sinon.assert.calledWith(reply.code, 200);
      sinon.assert.calledWith(reply.send, {
        success: true,
        message: 'Category Found Successfully!',
        body: categoryData,
      });

      // Clean up
      sinon.restore();
    });

    it('should return a 404 error when category does not exist', async () => {
      // Arrange
      const categoryId = 1;

      const request = {
        params: { id: categoryId.toString() },
      };

      const reply = {
        code: sinon.stub(),
        send: sinon.stub(),
      };

      sinon.stub(CategoryService, 'findOneCategory').resolves(null);

      // Act
      await CategoryController.findOneCategory(request as any, reply as any);

      // Assert
      sinon.assert.calledWith(reply.code, 404);
      sinon.assert.calledWith(reply.send, {
        error: 'Category not found',
      });

      // Clean up
      sinon.restore();
    });

    it('should return a 500 error on internal server error', async () => {
      // Arrange
      const categoryId = 1;

      const request = {
        params: { id: categoryId.toString() },
      };

      const reply = {
        code: sinon.stub(),
        send: sinon.stub(),
      };

      sinon.stub(CategoryService, 'findOneCategory').rejects(new Error('Some internal error'));

      // Act
      await CategoryController.findOneCategory(request as any, reply as any);

      // Assert
      sinon.assert.calledWith(reply.code, 500);
      sinon.assert.calledWith(reply.send, {
        error: 'Internal Server Error',
      });

      // Clean up
      sinon.restore();
    });
  });
});
