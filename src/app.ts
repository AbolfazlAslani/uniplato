import fastify from 'fastify';
import AllRoutes from './routes/routes';
import dotenv from 'dotenv';
import fastifyJWT from '@fastify/jwt'
import path from 'path';

// Load environment variables from .env file
dotenv.config();



const server = fastify();

const secretKey:any = process.env.JWT_KEY

//*Configure JWT
server.register(fastifyJWT, { secret: secretKey });  // Adjust this line

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
(async()=>{
    await server.register(require('@fastify/swagger'),swaggerOptions)


await server.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request:any, reply:any, next:any) { next() },
    preHandler: function (request:any, reply:any, next:any) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header:any) => header,
  transformSpecification: (swaggerObject:any, request:any, reply:any) => { return swaggerObject },
  transformSpecificationClone: true
})
})()



//* All Routes
server.get('/', (request, reply) => {
  reply.code(200).send({ msg: 'Salam' });
});

server.register(AllRoutes);

const port:number = 3000;

server.listen( port , '0.0.0.0',(err) => {
  try {
    console.log(`Server running on http://localhost:${port} or http://0.0.0.0:${port} `);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});


export default server;
