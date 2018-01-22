import { Prompts } from 'botbuilder';
import { RECAP } from './recap.newpost';
import { getProperties } from '../../properties';

export const NEW_OBSERVATION = 'NEW_OBSERVATION';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(NEW_OBSERVATION, [
    session => Prompts.text(session, properties.MSG_NEW_OBSERVATION),
    (session, results) => {
      session.privateConversationData.newObservation = results.response;

      session.beginDialog(RECAP);
    },
  ]);
}
