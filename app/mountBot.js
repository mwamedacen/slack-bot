import { UniversalBot, ChatConnector } from 'botbuilder';
import config from './configuration';
import setupBotStorage from './setupBotStorage';
import mountDialogStack from './mountDialogStack';

export default function(server) {
  const connector = new ChatConnector({
    appId: config.MicrosoftAppId,
    appPassword: config.MicrosoftAppPassword,
    openIdMetadata: config.BotOpenIdMetadata,
  });

  server.post('/api/messages', connector.listen());

  const bot = new UniversalBot(connector);

  setupBotStorage(bot);
  mountDialogStack(bot);
}
