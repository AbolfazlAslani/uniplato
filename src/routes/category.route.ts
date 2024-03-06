// auth.route.ts
import { FastifyPluginAsync } from 'fastify';
import CategoryController from '../controllers/category.controller';
import categorySchema from '../schemas/category.schema';


interface IBodyCategory{
  latitiude:number,
  longtitude: number,
  category:string,
  counter:number

}

interface IReply{
  201:{
    success:true,
    message:string,
    body:object
  },
  '4xx':{error : string}
}

//* Authentication Routes
const routes: FastifyPluginAsync = async (fastify) => {

    //* CreateCategory endpoint
    fastify.post<{
    Body:IBodyCategory,
    Reply:IReply
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
    
  };
  export default routes;