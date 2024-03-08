import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJwt } from '../functions';

type MyPreHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<void>;

const jwtPreHandler: MyPreHandler = async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      reply.code(401).send({ error: 'Unauthorized - Missing token' });
      return;
    }

    // Verify the JWT token
    const decodedPayload = await verifyJwt(token);

    // Attach the decoded payload to the request for later use in route handlers
    (request as any).jwtPayload = decodedPayload;
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized - Invalid token' });
  }
};

export default jwtPreHandler;
