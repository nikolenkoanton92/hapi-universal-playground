import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
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
  path: '/public/{path*}',
  handler: {
    directory: {
      path: path.join(__dirname, 'public')
    }
  }
});

server.ext('onRequest', (request, reply) => {
  const {req, res} = request.raw;
  const _webpackDevMiddleware = webpackDevMiddleware(webpack(webpackConfig), {
    publicPath: '/static/',
    stats: {
      colors: true
    }
  });
  _webpackDevMiddleware(req, res, error => {
    if (error)
      return reply(error);

    reply.continue();
  });
});

server.ext('onPreResponse', (request, reply) => {
  if (request.response.variety === 'file') {
    reply.continue();
  } else {
    reply.view('index');
  }
});

server.start(() => {
  console.log('Server start at:', server.info.uri);
});
