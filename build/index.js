"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AskCommand", {
  enumerable: true,
  get: function () {
    return _ask.default;
  }
});
Object.defineProperty(exports, "ClapCommand", {
  enumerable: true,
  get: function () {
    return _clap.default;
  }
});
Object.defineProperty(exports, "PhishCommand", {
  enumerable: true,
  get: function () {
    return _phish.default;
  }
});
Object.defineProperty(exports, "ShitpostCommand", {
  enumerable: true,
  get: function () {
    return _shitpost.default;
  }
});
Object.defineProperty(exports, "TriviaCommand", {
  enumerable: true,
  get: function () {
    return _trivia.default;
  }
});
Object.defineProperty(exports, "WeatherCommand", {
  enumerable: true,
  get: function () {
    return _weather.default;
  }
});

var _ask = _interopRequireDefault(require("./commands/ask"));

var _clap = _interopRequireDefault(require("./commands/clap"));

var _phish = _interopRequireDefault(require("./commands/phish"));

var _shitpost = _interopRequireDefault(require("./commands/shitpost"));

var _trivia = _interopRequireDefault(require("./commands/trivia"));

var _weather = _interopRequireDefault(require("./commands/weather"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }