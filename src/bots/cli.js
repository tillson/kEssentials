/*
* Klaus CLI
* THIS TAKES STDIN AND RUNS IT as
* an onMessageTrigger.
*/
import { Bot } from 'klaus';
import { CommandTrigger, PingCommand } from 'klaus';
import readline from 'readline';

export default class CLIBot extends Bot {

  constructor(options) {
    super(options);
    this.components.push(new PingCommand());

    this.initializeCLI();
  }

  /*
  * On message trigger event (override)
  * Slack bot receieved a message from one of its triggers.
  */
  onMessageTrigger = async (payload) => {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i] instanceof CommandTrigger && this.components[i].stringStartsWithCommand(payload.text)) {
        this.components[i].handleCommand(payload.text);
        continue;
      }
    }
  }

  /*
  * Send message (override)
  * Slack bots can send messages that its triggers send it.
  * Note that the Slack username field is actually Klaus's title field.
  */
  sendMessage = (message) => {
    try {
      if (message.title) {
        this.cli.write('### ' + message.title + ' ###');
      }
      this.cli.write(message.text + (message.url ? message.url : ''));
    } catch (err) {
      console.log(err);
    }
  }

  initializeCLI() {
    this.cli = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.cli.on('line', (input) => {
      this.onMessageTrigger({ text: input });
    });
  }

}
