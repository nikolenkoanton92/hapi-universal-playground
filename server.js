import Hapi from 'Hapi';
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8080
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Hello World');
  }
});

server.start(() => {
  console.log('Server start at:', server.info.uri);
});
