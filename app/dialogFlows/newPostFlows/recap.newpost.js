import _ from 'lodash';
import { Prompts, ListStyle } from 'botbuilder';
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

      let choices;

      if (newObservation && !cause && !solution) {
        choices = _.clone(allChoices);
      } else if (newObservation && cause && !solution) {
        choices = _.omit(allChoices, [properties.BTN_CAUSE]);
      } else if (newObservation && !cause && solution) {
        choices = _.omit(allChoices, [properties.BTN_SOLUTION]);
      } else if (newObservation && cause && solution) {
        choices = _.omit(allChoices, [properties.BTN_CAUSE, properties.BTN_SOLUTION]);
      }

      const message = _.trim(`**${properties.TITLE_RECAP_OBSERVATION}**
        
        >${'> '+newObservation}
        
        ${cause && '**' + properties.TITLE_RECAP_CAUSE + '**' || ''}
        
        ${cause ? '> '+ cause : ''}
        
        ${solution && '**'+properties.TITLE_RECAP_SOLUTION+'**' || ''}
        
        ${solution ? '> '+solution : ''}
      `).replace(/\s\s+/, '');

      Prompts.choice(session, message, choices, { listStyle: ListStyle.button });
    },
    (session, results) => {
      session.beginDialog(allChoices[results.response.entity].dialog);
    },
  ]);
}

export const RECAP = 'RECAP';
