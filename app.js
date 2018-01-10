import restify from 'restify';
import config from './app/configuration';
import mountBot from './app/mountBot';

// Setup Restify Server
const server = restify.createServer();

mountBot(server);

server.listen(config.PORT, () => {
  console.log('%s listening to %s', server.name, server.url);
});
