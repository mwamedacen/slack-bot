import { getProperties } from '../../properties';

export const CANCEL = 'CANCEL';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(CANCEL, [
    session => session.endConversation(properties.MSG_CANCEL),
  ]);
}
