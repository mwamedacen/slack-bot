import browsePostFlows from './browsePostFlows';
import myPostsFlows from './myPostsFlows';
import newPostFlows from './newPostFlows';

export default function(bot) {
  browsePostFlows(bot);
  myPostsFlows(bot);
  newPostFlows(bot);
}
