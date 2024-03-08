"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
// Load environment variables from .env file
dotenv_1.default.config();
const server = (0, fastify_1.default)();
const secretKey = process.env.JWT_KEY;
//*Configure JWT
server.register(jwt_1.default, { secret: secretKey }); // Adjust this line
const swaggerOptions = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'uniplato',
            description: 'Auth system and Category CRUD',
            version: '1.0.0',
        },
        exposeRoute: true,
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: 'Enter your bearer token in the format "Bearer <token>"',
            },
        },
    },
};
//* Swagger Configuration
(async () => {
    await server.register(require('@fastify/swagger'), swaggerOptions);
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
server.register(routes_1.default);
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
exports.default = server;
