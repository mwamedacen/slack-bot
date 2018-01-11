export const MY_POSTS = 'MY_POSTS';

export default function(bot) {
  bot.dialog(MY_POSTS, [
    session => session.endConversation('not yet implemented'),
  ]);
}
