import { Prompts } from 'botbuilder';
import { getProperties } from './properties';
import { NEW_POST } from './dialogFlows/newPostFlows';
import { MY_POSTS } from './dialogFlows/myPostsFlows';
import { BROWSE_POST } from './dialogFlows/browsePostFlows';
import mountDialogs from './dialogFlows';

export default function(bot) {
  const properties = getProperties();

  mountDialogs(bot);

  const mainChoices = {
    [properties.BTN_NEW_POST]: {
      dialog: NEW_POST,
    },
    [properties.BTN_BROWSE_POST]: {
      dialog: BROWSE_POST,
    },
    [properties.BTN_MY_POSTS]: {
      dialog: MY_POSTS,
    },
  };

  bot.dialog('/', [
    session => {
      //const teamId = session.message.sourceEvent && session.message.sourceEvent.team && session.message.sourceEvent.team.id;
      Prompts.choice(session, properties.MSG_WELCOME, mainChoices);
    },
    (session, results) => {
      session.beginDialog(mainChoices[results.response.entity].dialog);
    },
  ]);
}