import newObservation, { NEW_OBSERVATION } from './newobservation.newpost';
import cancel from './cancel.newpost';
import cause from './cause.newpost';
import publish from './publish.newpost';
import recap from './recap.newpost';
import solution from './solution.newpost';

export const NEW_POST = 'NEW_POST';

export default function(bot) {
  newObservation(bot);
  cancel(bot);
  cause(bot);
  publish(bot);
  recap(bot);
  solution(bot);

  bot.dialog(NEW_POST, [session => session.beginDialog(NEW_OBSERVATION)]);
}
