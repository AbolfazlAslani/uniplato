import fastify from 'fastify';
import AllRoutes from './routes/routes';
import dotenv from 'dotenv';
import fastifyJWT from '@fastify/jwt';
// Load environment variables from .env file
dotenv.config();
const server = fastify();
const secretKey = process.env.JWT_KEY;
//*Configure JWT
server.register(fastifyJWT, { secret: secretKey }); // Adjust this line
//* Swagger Configuration
(async () => {
    await server.register(require('@fastify/swagger'));
    await server.register(require('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next(); },
            preHandler: function (request, reply, next) { next(); }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
        transformSpecificationClone: true
    });
})();
//* All Routes
server.get('/', (request, reply) => {
    reply.code(200).send({ msg: 'Salam' });
});
server.register(AllRoutes);
const port = 3000;
server.listen({ port }, (err) => {
    try {
        console.log(`Server running on http://localhost:${port}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
export default server;
