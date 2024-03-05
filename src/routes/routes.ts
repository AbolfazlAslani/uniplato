// auth.route.ts
import AuthController from '../controllers/auth.controller';
import userSchema from '../schemas/user.schema';
import { FastifyPluginAsync } from 'fastify';

import authRoute from './auth.route'

const routes: FastifyPluginAsync = async (fastify) => {
    
    //* Registred auth routes
    //* Accessible through : http://localhost:3000/auth
    fastify.register(authRoute,{prefix:"/auth"});
  };
  
  export default routes;