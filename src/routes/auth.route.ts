// auth.route.ts
import AuthController from '../controllers/auth.controller';
import userSchema from '../schemas/user.schema';
import { FastifyPluginAsync } from 'fastify';


//* Authentication Routes
const routes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/signup', {
      schema: userSchema.schema,
      handler: AuthController.signUp,
    });
  };
  
  export default routes;