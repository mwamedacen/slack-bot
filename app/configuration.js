require('dotenv').config();

export default {
  MicrosoftAppId: process.env.MicrosoftAppId,
  MicrosoftAppPassword: process.env.MicrosoftAppPassword,
  BotOpenIdMetadata: process.env.BotOpenIdMetadata,
  AzureWebJobsStorage: process.env.AzureWebJobsStorage,
  PORT: process.env.port || process.env.PORT || 3978,
};
