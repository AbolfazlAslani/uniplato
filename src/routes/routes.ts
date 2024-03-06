// auth.route.ts
import { FastifyPluginAsync } from 'fastify';
import categoryRoute from './category.route'


const routes: FastifyPluginAsync = async (fastify) => {

    //* Registred auth routes
    //* Accessible through : http://localhost:3000/category
    fastify.register(categoryRoute,{prefix:"/category"});
  };

  export default routes;