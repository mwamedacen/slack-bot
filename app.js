import restify from 'restify';
import config from './app/configuration';
import mountBot from './app/mountBot';
import { loadProperties } from './app/properties';
import setupDatabase from './app/setupDatabase';

Promise.all([ loadProperties(), setupDatabase() ]).then(() => {
  // Setup Restify Server
  const server = restify.createServer();

  mountBot(server);

  server.listen(config.PORT, () => {
    console.log('%s listening to %s', server.name, server.url);
  });
}, error => {
  console.error('An error happened on loading properties or setuping databse', error);
});
