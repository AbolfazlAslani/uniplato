// auth.route.ts
import AuthController from '../controllers/auth.controller';
import {userSchema,loginSchema} from '../schemas/user.schema';
import { FastifyPluginAsync } from 'fastify';
import categoryRoute from './category.route'
import authRoute from './auth.route'


interface IBody{
  name:string,
  lastname: string,
  phoneNumber:string,
  email:string,
  password:string

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

    //* Registred auth routes
    //* Accessible through : http://localhost:3000/auth
    fastify.register(authRoute,{prefix:"/auth"});
    
    //* Registred category routes
    //* Accessible through : http://localhost:3000/category
    fastify.register(categoryRoute,{prefix:"/category"});
  };

  export default routes;