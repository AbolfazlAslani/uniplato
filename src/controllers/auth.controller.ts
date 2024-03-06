import { createUser } from "../services/userService";
import { FastifyRequest, FastifyReply } from 'fastify';
import hashPassword from "../functions/functions";

class AuthController {
  static async signUp(request: FastifyRequest, reply: FastifyReply):Promise<void> {
    try {
      //? Catching Body
      const { name, lastname, phoneNumber, email, password } = request.body as {
        name: string;
        lastname: string;
        phoneNumber: string;
        email: string;
        password: string;
      };
      //* Hashing password before adding to the database
      const hashedPassword = await hashPassword(password);
      
      //? Creating New User in database with Prisma
      const user = await createUser({ name, lastname, phoneNumber, email, password:hashedPassword });

      if (user) {
        reply.code(201).send({
          success:true,
          message: "Created Successfully!",
          body: user
        });
      }
    } catch (error:any) {
      //? Handle duplicate email error
      if (error.code === 'P2002') {
        reply.code(400).send({
            error: 'Email already taken'
        });
        //? Handle InternalServerError request
      } else {
        reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}

export default AuthController;
