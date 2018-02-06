import _ from 'lodash';
import { Prompts, ListStyle } from 'botbuilder';
import { getProperties } from '../../properties';
import { PUBLISH } from './publish.newpost';
import { CANCEL } from './cancel.newpost';
import { SOLUTION } from './solution.newpost';
import { CAUSE } from './cause.newpost';
import { isSlack } from '../../utils/channel.service';

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

      if(isSlack(session)){
        formatPayloadForSlack({session, newObservation, cause, solution});
      } else {
        formatPayloadGenericly({session, newObservation, cause, solution});
      }
    },
    (session, results) => {
      session.beginDialog(allChoices[results.response.entity].dialog);
    },
  ]);
}

function formatPayloadGenericly({session, newObservation, cause, solution}){
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
        
        ${'> '+newObservation}
        
        ${cause && '**' + properties.TITLE_RECAP_CAUSE + '**' || ''}
        
        ${cause ? '> '+ cause : ''}
        
        ${solution && '**' + properties.TITLE_RECAP_SOLUTION + '**' || ''}
        
        ${solution ? '> '+solution : ''}
      `).replace(/\s\s+/, '');

  Prompts.choice(session, {type: 'message', textFormat: 'markdown', text: message}, choices, { listStyle: ListStyle.button });
}

function formatPayloadForSlack({session, newObservation, cause, solution}) {
  const properties = getProperties();

  const message = {
    "attachments": [
      {
        "fallback": properties.TITLE_RECAP_OBSERVATION,
        "color": "#ff0044",
        "pretext": properties.TITLE_RECAP_OBSERVATION,
        "fields": _.compact([
          {
            "title": properties.TITLE_RECAP_OBSERVATION,
            "value": newObservation,
            "short": false
          },
          cause && {
            "title": properties.TITLE_RECAP_CAUSE,
            "value": cause,
            "short": false
          },
          solution && {
            "title": properties.TITLE_RECAP_SOLUTION,
            "value": solution,
            "short": false
          },
        ]),
      },
      {
        "fallback": "Please choose an option",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": _.compact([
          cause && {
            "name": properties.BTN_CAUSE,
            "text": properties.BTN_CAUSE,
            "type": "button",
            "value": CAUSE
          },
          solution && {
            "name": properties.BTN_SOLUTION,
            "text": properties.BTN_SOLUTION,
            "type": "button",
            "value": SOLUTION
          },
          {
            "name": properties.BTN_CANCEL,
            "text": properties.BTN_CANCEL,
            "style": "danger",
            "type": "button",
            "value": CANCEL
          },
          {
            "name": properties.PUBLISH,
            "text": properties.PUBLISH,
            "style": "primary",
            "type": "button",
            "value": PUBLISH
          },
        ]),
      },
    ],
  };

  Prompts.choice(session, {sourceEvent: message});
}

export const RECAP = 'RECAP';
