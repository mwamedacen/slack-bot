import _ from 'lodash';
import UserContribution from '../../models/UserContribution.model';
import { getProperties } from '../../properties';

export const BROWSE_POST = 'BROWSE_POST';

export default function(bot) {
  bot.dialog(BROWSE_POST, [
    session =>
      UserContribution.find({}, (err, ucs) => {
        const properties = getProperties();
        if (err) return session.endConversation(properties.GENERIC_ERROR);
        if (!ucs.length) return session.endConversation(properties.EMPTY_POSTS);

        const listOfContributions = _.map(ucs, uc => {
          const { contribution, user } = uc.toJSON();
          const observation = `Observation = ${contribution.newObservation}`;
          const cause = contribution.cause ? ` - Cause = ${contribution.cause}` : '';
          const solution = contribution.solution ? ` - Solution = ${contribution.solution}` : '';

          return `* ${user.name} posted : ${observation}${cause}${solution}`;
        }).join('\n');

        return session.endConversation(`Here are all the posts of your team \n ${listOfContributions}`);
      }),
  ]);
}
