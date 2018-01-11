import { getProperties } from '../../properties';

export const PUBLISH = 'PUBLISH';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(PUBLISH, [
    session => {
      session.endConversation(properties.MSG_PUBLISH);
    },
  ]);
}
