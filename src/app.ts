// src/app.ts
import fastify from 'fastify';
import { createUser } from './services/userService';

const server = fastify();

server.post('/signup', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'lastname', 'phoneNumber', 'email', 'password', 'confirmPassword'],
      properties: {
        name: { type: 'string' },
        lastname: { type: 'string' },
        phoneNumber: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
      },
    },
  },
  handler: async (request, reply) => {
    try {
      const { name, lastname, phoneNumber, email, password } = request.body as {
        name: string;
        lastname: string;
        phoneNumber: string;
        email: string;
        password: string;
      };

      // Additional validation logic can be added here

      const user = await createUser({ name, lastname, phoneNumber, email, password });

      // Ensure that 'user' is defined before using it in the response
      if (user) {
        reply.code(201).send({
        message:"Created Successfully!", 
        user
        });
      } else {
        // Handle the case where 'createUser' did not return a valid user
        reply.code(500).send({ error: 'User creation failed' });
      }
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  },
});


const port =3000;

server.listen({port},(err)=>{
    try {
        console.log(`Server running on http://localhost:${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }

})
