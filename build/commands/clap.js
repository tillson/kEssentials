"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _klaus = require("klaus");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ClapCommand extends _klaus.CommandTrigger {
  constructor(bot, options) {
    super(bot, options);

    _defineProperty(this, "handleCommand", commandString => {
      var words = commandString.trim().split(" ");
      var string = "";

      for (var i = 0; i < words.length; i++) {
        string += words[i] + " 👏 ";
      }

      this.bot.sendMessage({
        text: string
      });
    });

    this.commandString = 'clap';
  }

}

var _default = ClapCommand;
exports.default = _default;