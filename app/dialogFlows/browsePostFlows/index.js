export const BROWSE_POST = 'BROWSE_POST';

export default function(bot) {
  bot.dialog(BROWSE_POST, [
    session => session.endConversation('not yet implemented'),
  ]);
}
