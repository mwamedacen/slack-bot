import { Prompts } from 'botbuilder';
import { RECAP } from './recap.newpost';
import { getProperties } from '../../properties';

export const SOLUTION = 'SOLUTION';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(SOLUTION, [
    session => {
      Prompts.text(session, properties.MSG_SOLUTION);
    },
    (session, results) => {
      session.privateConversationData.solution = results.response;

      session.beginDialog(RECAP);
    },
  ]);
}
