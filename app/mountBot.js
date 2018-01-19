import { UniversalBot, ChatConnector } from 'botbuilder';
import config from './configuration';
import setupBotStorage from './setupBotStorage';
import mountDialogStack from './mountDialogStack';

export default function (server) {
// Create chat connector for communicating with the Bot Framework Service
  const connector = new ChatConnector({
    appId: config.MicrosoftAppId,
    appPassword: config.MicrosoftAppPassword,
    openIdMetadata: config.BotOpenIdMetadata,
  });

// Listen for messages from users
  server.post('/api/messages', connector.listen());

  /*----------------------------------------------------------------------------------------
  * Bot Storage: This is a great spot to register the private state storage for your bot.
  * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
  * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
  * ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
  const bot = new UniversalBot(connector);

  setupBotStorage(bot);
  mountDialogStack(bot);
}
