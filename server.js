import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';
const server = new Hapi.Server();


server.connection({
  host: 'localhost',
  port: 8080
});

server.register([Inert, Vision], (err) => {
  if (err)
    throw err;
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'views')
});

/**
 * serve static requests from the public folder
 */

server.route({
  method: 'GET',
  path: '/{params*}',
  handler: {
    file: (request) => 'public' + request.path
  }
});

server.ext('onPreResponse', (request, reply) => {
  reply.view('index');
});

server.start(() => {
  console.log('Server start at:', server.info.uri);
});
