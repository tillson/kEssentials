"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _klaus = require("klaus");

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CLIBot extends _klaus.Bot {
  constructor(options) {
    super(options);

    _defineProperty(this, "onMessageTrigger", async payload => {
      for (var i = 0; i < this.components.length; i++) {
        if (this.components[i] instanceof _klaus.CommandTrigger && this.components[i].stringStartsWithCommand(payload.text)) {
          this.components[i].handleCommand(payload.text);
          continue;
        }
      }
    });

    _defineProperty(this, "sendMessage", message => {
      try {
        if (message.title) {
          this.cli.write('### ' + message.title + ' ###');
        }

        this.cli.write(message.text + (message.url ? message.url : ''));
      } catch (err) {
        console.log(err);
      }
    });

    this.components.push(new _klaus.PingCommand());
    this.initializeCLI();
  }
  /*
  * On message trigger event (override)
  * Slack bot receieved a message from one of its triggers.
  */


  initializeCLI() {
    this.cli = _readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.cli.on('line', input => {
      this.onMessageTrigger({
        text: input
      });
    });
  }

}

exports.default = CLIBot;