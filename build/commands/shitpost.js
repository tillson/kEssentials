"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("request"));

var _klaus = require("klaus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ShitpostCommand extends _klaus.CommandTrigger {
  constructor(_bot, options) {
    super(_bot, options);

    _defineProperty(this, "handleCommand", commandString => {
      const bot = this.bot;
      (0, _request.default)('https://www.reddit.com/r/copypasta/.json', function (error, resp, body) {
        var posts = JSON.parse(body).data.children;
        var post = posts[Math.round(Math.random() * posts.length) - 1];

        if (post && post.data && post.data.selftext) {
          bot.sendMessage({
            text: post.data.selftext
          });
        }
      });
    });

    this.commandString = 'shitpost';
  }

}

var _default = ShitpostCommand;
exports.default = _default;