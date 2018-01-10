import { Prompts } from 'botbuilder';

export default function(bot) {
  bot.dialog('/', [
    session => {
      Prompts.text(session, "Hello... What's your name??");
    },
    (session, results) => {
      session.userData.name = results.response;
      Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
    },
    (session, results) => {
      session.userData.coding = results.response;
      Prompts.choice(session, "What language do you code Node using?", ["JavaScript", "CoffeeScript", "TypeScript"]);
    },
    (session, results) => {
      session.userData.language = results.response.entity;
      session.send("Got it... " + session.userData.name +
        " you've been programming for " + session.userData.coding +
        " years and use " + session.userData.language + ".");
    }
  ]);
}
