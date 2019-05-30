var request = require('request');
import { CommandTrigger } from 'klaus';

class AskCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'ask';
  }

  handleCommand = (commandString) => {
    var query = encodeURIComponent(commandString);
    if (!this.options.WOLFRAM_KEY) {
      console.log('Error: unable to satisfy !ask command request because WOLFRAM_KEY is not set.');
      this.bot.sendMessage({ text: 'Sorry, I can\'t do that right now.', error: 'WOLFRAM_KEY is not set.'});
       return;
    }
    request('https://api.wolframalpha.com/v1/result?i=' + query + '&appid=' + this.options.WOLFRAM_KEY, function(error, resp, body) {
      this.bot.sendMessage({ text: body });
    });
  }
}

export default AskCommand;