import { AzureTableClient, AzureBotStorage } from 'botbuilder-azure';
import { MemoryBotStorage } from 'botbuilder';
import { BOT_DATA_TABLE_NAME } from './constants';
import config from './configuration';

export default function(bot) {
  const azureTableClient = new AzureTableClient(BOT_DATA_TABLE_NAME, config.AzureWebJobsStorage);
  const tableStorage = new AzureBotStorage({gzipData: false}, azureTableClient);

  bot.set('storage', new MemoryBotStorage());
}
