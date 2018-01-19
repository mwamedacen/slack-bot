import _ from 'lodash';

import UserContribution from '../../models/UserContribution.model';
export const BROWSE_POST = 'BROWSE_POST';

export default function (bot) {
  bot.dialog(BROWSE_POST, [
    session =>
      UserContribution.find({}, (err, ucs) => {
        if (err) return session.endConversation('an error occured');
        if (!ucs.length)
          return session.endConversation('there\'s no contribution for your team yet');

        const listOfContributions = _.map(ucs, uc => {
          const { contribution, user } = uc.toJSON();
          const observation = `Observation = ${contribution.newObservation}`;
          const cause = contribution.cause ? ` - Cause = ${contribution.cause}` : '';
          const solution = contribution.solution ? ` - Solution = ${contribution.solution}` : '';

         return `* ${user.name} posted : ${observation}${cause}${solution}`;
        }).join('\n');

        return session.endConversation(`Here are all the contributions \n ${listOfContributions}`);
      }),
  ]);
}
