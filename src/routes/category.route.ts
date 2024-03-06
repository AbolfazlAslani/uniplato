// auth.route.ts
import { FastifyPluginAsync } from 'fastify';
import CategoryController from '../controllers/category.controller';
import {categorySchema,updateOneSchema} from '../schemas/category.schema';

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

//* Authentication Routes
const routes: FastifyPluginAsync = async (fastify) => {

  //* CreateCategory endpoint
  fastify.post<{
    Body: IBodyCategory;
    Reply: IReply;
  }>('/create', {
    schema: categorySchema.schema,
    handler: CategoryController.createCategory,
  });

  //* FindOne Category endpoint
  fastify.get<{
    Params: { id: string };
    Reply: IReply;
  }>('/findone/:id', {
    handler: CategoryController.findOneCategory,
  });

  //* FindAll Categories endpoint
  fastify.get<{
    Reply: IReply;
  }>('/findall', {
    handler: CategoryController.findAllCategories,
  });
  
  //* UpdateOne Category endpoint
  fastify.put<{
    Params: { id: string };
    Body: IBodyCategory;
    Reply: IReply;
  }>('/update/:id', { 
    schema:updateOneSchema.schema,
    handler: CategoryController.updateOneCategory,
  });
    
    //* DeleteOne Category endpoint
  fastify.delete<{
    Params: { id: string };
    Reply: IReply;
  }>('/delete/:id', {
    handler: CategoryController.deleteOneCategory,
  });


};

export default routes;
