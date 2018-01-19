import { getProperties } from '../../properties';
import UserContribution from '../../models/UserContribution.model';

export const PUBLISH = 'PUBLISH';

export default function(bot) {
  const properties = getProperties();

  bot.dialog(PUBLISH, [
    session => {
      const {
        newObservation,
        cause,
        solution,
      } = session.privateConversationData;

      const { message } = session;

      UserContribution.create(
        {
          ...message,
          contribution: {
            newObservation,
            cause,
            solution,
          },
        },
        err => {
          if (err) return session.endConversation('An error occured, your contribution hasn\'t been submitted sorry');

          return session.endConversation(properties.MSG_PUBLISH);
        },
      );
    },
  ]);
}
