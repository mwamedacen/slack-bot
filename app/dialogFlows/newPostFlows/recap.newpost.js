import _ from 'lodash';
import { Prompts } from 'botbuilder';
import { getProperties } from '../../properties';
import { PUBLISH } from './publish.newpost';
import { CANCEL } from './cancel.newpost';
import { SOLUTION } from './solution.newpost';
import { CAUSE } from './cause.newpost';

export default function(bot) {
  const properties = getProperties();

  const allChoices = {
    [properties.BTN_CAUSE]: {
      dialog: CAUSE,
    },
    [properties.BTN_SOLUTION]: {
      dialog: SOLUTION,
    },
    [properties.BTN_CANCEL]: {
      dialog: CANCEL,
    },
    [properties.BTN_PUBLISH]: {
      dialog: PUBLISH,
    },
  };

  bot.dialog(RECAP, [
    session => {
      const {
        newObservation,
        cause,
        solution,
      } = session.privateConversationData;

      let message;
      let choices;

      if (newObservation && !cause && !solution) {
        message = `${properties.TITLE_RECAP_OBSERVATION}
        
        ${newObservation}`;
        choices = _.clone(allChoices);
      } else if (newObservation && cause && !solution) {
        message = `${properties.TITLE_RECAP_OBSERVATION}
        
        ${newObservation}
        
        ${properties.TITLE_RECAP_CAUSE}
        
        ${cause}`;
        choices = _.omit(allChoices, [properties.BTN_CAUSE]);
      } else if (newObservation && !cause && solution) {
        message = `${properties.TITLE_RECAP_OBSERVATION}
        
        ${newObservation}
        
        ${properties.TITLE_RECAP_SOLUTION}
        
        ${solution}`;
        choices = _.omit(allChoices, [properties.BTN_SOLUTION]);
      } else if (newObservation && cause && solution) {
        message = `${properties.TITLE_RECAP_OBSERVATION}
        
        ${newObservation}
        
        ${properties.TITLE_RECAP_CAUSE}
        
        ${cause}
        
        ${properties.TITLE_RECAP_SOLUTION}
        
        ${solution}`;
        choices = _.omit(allChoices, [properties.BTN_CAUSE, properties.BTN_SOLUTION]);
      }

      Prompts.choice(session, message, choices);
    },
    (session, results) => {
      session.beginDialog(allChoices[results.response.entity].dialog);
    },
  ]);
}

export const RECAP = 'RECAP';
