import { Prompts } from 'botbuilder';
import { RECAP } from './recap.newpost';
import { getProperties } from '../../properties';

export const CAUSE = 'CAUSE';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(CAUSE, [
    session => {
      Prompts.text(session, properties.MSG_CAUSE);
    },
    (session, results) => {
      session.privateConversationData.cause = results.response;

      session.beginDialog(RECAP);
    },
  ]);
}
