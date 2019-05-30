import { CommandTrigger } from 'klaus';

class ClapCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'clap';
  }

  handleCommand = (commandString) => {
    var words = commandString.trim().split(" ");
    var string = "";
    for (var i = 0; i < words.length; i++) {
        string += words[i] + " 👏 ";
    }
    this.bot.sendMessage({ text: string });
  }
}

export default ClapCommand;