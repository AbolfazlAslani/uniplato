// auth.route.ts
import AuthController from '../controllers/auth.controller';
import {userSchema,loginSchema} from '../schemas/user.schema';
import { FastifyPluginAsync } from 'fastify';


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

    //* Signup endpoint
    fastify.post<{
    Body:IBody,
    Reply:IReply
    }>('/signup', {
      schema: userSchema.schema,
      handler: AuthController.signUp,
    });
    
    //* Login endpoint
    fastify.post('/login', {
        schema: loginSchema.schema,
        handler: AuthController.Login,
      });
  };
  export default routes;