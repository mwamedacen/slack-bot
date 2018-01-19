require('dotenv').config();

export default {
  MicrosoftAppId: process.env.MicrosoftAppId,
  MicrosoftAppPassword: process.env.MicrosoftAppPassword,
  BotOpenIdMetadata: process.env.BotOpenIdMetadata,
  AzureWebJobsStorage: process.env.AzureWebJobsStorage,
  PORT: process.env.port || process.env.PORT || 3978,
  databaseUrl: process.env.MONGODB_URI ||
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PWD}@${
    process.env.DB_URL
    }:${process.env.DB_PORT}/${process.env.DB_NAME}` ||
  '',
};
