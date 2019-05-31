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

    this.initializeCLI();
  }

  /*
  * On message trigger event (override)
  */
 onMessageTrigger = async (payload) => {
  console.log(payload);
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i].commandString && this.components[i].stringStartsWithCommand(payload.text)) {
      this.components[i].handleCommand(payload.text);
    }
  }
}

  /*
  * Send message (override)
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
