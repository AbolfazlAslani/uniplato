import { FastifyPluginAsync } from 'fastify';
import CategoryController from '../controllers/category.controller';
import {createCategorySchema,deleteOneCategorySchema,findAllCategoriesSchema,findOneCategorySchema,updateCategorySchema} from '../schemas/category.schema'
import jwtPreHandler from '../utils/preHandlers/auth-verify';

interface IBodyCategory {
  latitude: number;
  longitude: number;
  category: string;
  counter: number;
}

interface IReply {
  201: {
    success: true;
    message: string;
    body: object;
  };
  '4xx': {
    error: string;
  };
}
const swaggerOptions = {
  schema: {
    tags: ['Category'],
    summary: 'Categories',
  },
};




const categoryRoutes: FastifyPluginAsync = async (fastify) => {
  // Register the JWT preHandler for all routes
  fastify.addHook('preHandler', jwtPreHandler);

  //* CreateCategory endpoint
  fastify.post<{
    Body: IBodyCategory;
    Reply: IReply;
  }>('/create', {
    schema:{...createCategorySchema.schema,...swaggerOptions.schema},
    handler: CategoryController.createCategory,
  });

  //* FindOne Category endpoint
  fastify.get<{
    Params: { id: string };
    Reply: IReply;
  }>('/findone/:id', {
    schema:{...findOneCategorySchema.schema,...swaggerOptions.schema},

    handler: CategoryController.findOneCategory,
  });

  //* FindAll Categories endpoint
  fastify.get<{
    Reply: IReply;
  }>('/findall', {
    schema:{...findAllCategoriesSchema.schema,...swaggerOptions.schema},

    handler: CategoryController.findAllCategories,
  });

  //* UpdateOne Category endpoint
  fastify.put<{
    Params: { id: string };
    Body: IBodyCategory;
    Reply: IReply;
  }>('/update/:id', {
    schema:{...updateCategorySchema.schema,...swaggerOptions.schema},

    handler: CategoryController.updateOneCategory,
  });

  //* DeleteOne Category endpoint
  fastify.delete<{
    Params: { id: string };
    Reply: IReply;
  }>('/delete/:id', {
    schema:{...deleteOneCategorySchema.schema,...swaggerOptions.schema},

    handler: CategoryController.deleteOneCategory,
  });
};

export default categoryRoutes;
