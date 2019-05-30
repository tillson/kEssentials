import CLIBot from '../src/bots/cli';
/* Load environment variables */

import AskCommand from '../src/commands/ask';
import ClapCommand from '../src/commands/clap';
import PhishCommand from '../src/commands/phish';
import ShitpostCommand from '../src/commands/shitpost';
import TriviaCommand from '../src/commands/trivia';
import WeatherCommand from '../src/commands/weather';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

/* Enable your bots */
const bot = new CLIBot();
bot.components.push(
  new AskCommand(bot),
  new ClapCommand(bot),
  new PhishCommand(bot),
  new ShitpostCommand(bot),
  new TriviaCommand(bot),
  new WeatherCommand(bot)
);
app.listen(5000, function() {
  console.log('Listening on port 5000');
});