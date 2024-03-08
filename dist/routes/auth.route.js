// auth.route.ts
import AuthController from '../controllers/auth.controller';
import { userSchema, loginSchema } from '../schemas/user.schema';
//* Authentication Routes
const routes = async (fastify) => {
    //* Signup endpoint
    fastify.post('/signup', {
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
