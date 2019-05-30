"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _klaus = require("klaus");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var request = require('request');

class AskCommand extends _klaus.CommandTrigger {
  constructor(bot, options) {
    super(bot, options);

    _defineProperty(this, "handleCommand", commandString => {
      var query = encodeURIComponent(commandString);

      if (!this.options.WOLFRAM_KEY) {
        console.log('Error: unable to satisfy !ask command request because WOLFRAM_KEY is not set.');
        this.bot.sendMessage({
          text: 'Sorry, I can\'t do that right now.',
          error: 'WOLFRAM_KEY is not set.'
        });
        return;
      }

      request('https://api.wolframalpha.com/v1/result?i=' + query + '&appid=' + this.options.WOLFRAM_KEY, function (error, resp, body) {
        this.bot.sendMessage({
          text: body
        });
      });
    });

    this.commandString = 'ask';
  }

}

var _default = AskCommand;
exports.default = _default;