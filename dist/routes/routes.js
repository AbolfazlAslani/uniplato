import categoryRoute from './category.route';
import authRoute from './auth.route';
//* Authentication Routes
const routes = async (fastify) => {
    //* Registred auth routes
    //* Accessible through : http://localhost:3000/auth
    fastify.register(authRoute, { prefix: "/auth" });
    //* Registred category routes
    //* Accessible through : http://localhost:3000/category
    fastify.register(categoryRoute, { prefix: "/category" });
};
export default routes;
