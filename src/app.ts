import fastify from 'fastify';
import AllRoutes from './routes/routes';

const server = fastify();


//* All Routes 
server.register(AllRoutes);


const port =3000;

server.listen({port},(err)=>{
    try {
        console.log(`Server running on http://localhost:${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }

})

export default server;