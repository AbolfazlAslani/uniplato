// auth.route.ts
import AuthController from '../controllers/auth.controller';
import { signUpSchema, loginSchema } from '../schemas/user.schema';
import { FastifyPluginAsync } from 'fastify';

interface IBody {
  name: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface IReply {
  201: {
    success: true;
    message: string;
    body: object;
  };
  '4xx': { error: string };
}

// Swagger options for each route
const swaggerOptions = {
  schema: {
    tags: ['Auth'], // Group routes under the 'auth' category
    summary: 'Sign up or log in user', // Add a summary for the route
    // Additional Swagger options...
  },
};

//* Authentication Routes
const routes: FastifyPluginAsync = async (fastify) => {
  //* Signup endpoint
  fastify.post<{
    Body: IBody;
    Reply: IReply;
  }>('/signup', {
    schema: { ...signUpSchema.schema, ...swaggerOptions.schema },
    handler: AuthController.signUp,
  });

  //* Login endpoint
  fastify.post<{
    Body: IBody; // Adjust the type based on your login request body
    Reply: IReply;
  }>('/login', {
    schema: { ...loginSchema.schema, ...swaggerOptions.schema },
    handler: AuthController.Login,
  });
};

export default routes;
