import { createUser } from "../services/userService";
import { FastifyRequest, FastifyReply } from 'fastify';

class AuthController {
  static async signUp(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, lastname, phoneNumber, email, password } = request.body as {
        name: string;
        lastname: string;
        phoneNumber: string;
        email: string;
        password: string;
      };

      const user = await createUser({ name, lastname, phoneNumber, email, password });

      if (user) {
        reply.code(201).send({
          message: "Created Successfully!",
          user
        });
      }
    } catch (error:any) {
      console.error(error);
      //? Handle duplicate email error
      if (error.code === 'P2002') {
        reply.code(400).send({
            statusCode:400,
            errorMessage: 'Email already taken' 
        });
        //? Handle InternalServerError request 
      } else {
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}

export default AuthController;
