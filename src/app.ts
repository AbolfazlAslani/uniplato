import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
  return 'pong\n'
})


const port = 3000;
server.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at http://localhost:${port}`)
})