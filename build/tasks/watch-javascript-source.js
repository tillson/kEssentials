"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _klaus = require("klaus");

var _request = _interopRequireDefault(require("request"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class WatchJavascriptSource extends _klaus.Trigger {
  constructor(bot) {
    super(bot);

    _defineProperty(this, "checkForUpdates", () => {
      for (var i = 0; i < this.urls.length; i++) {
        this.checkUrl(this.urls[i]);
      }
    });

    _defineProperty(this, "setHash", (url, hash) => {
      this.data[url] = hash;
    });

    _defineProperty(this, "getSource", (url, callback) => {
      // console.log(url);
      (0, _request.default)(url, function (error, response) {
        callback(response.body);
      });
    });

    this.data = {};
    this.urls = ['https://buyer-static.postmates.com/dist/prod/client.277f4f646e332e7eea53.js'];
    this.bot = bot;

    _nodeCron.default.schedule('5 * * * *', this.queryHackerOne);

    this.checkForUpdates();
  }

  checkUrl(url) {
    const urls = this.urls;
    const getHash = this.getHash;
    const data = this.data;
    const setHash = this.setHash;
    const bot = this.bot;
    this.getSource(url, function (source) {
      const hash = getHash(source); // console.log(hash);

      if (!data[url]) {
        setHash(url, hash);
      }

      if (data[url] != hash) {
        // console.log('Hash change!');
        var urlParts = url.replace('http://', '').replace('https://', '').split(/[/?#]/);
        var domain = urlParts[0];
        bot.sendMessage({
          channel: process.env.SEC_ALERTS_CHANNEL,
          username: 'HTTPWatch',
          text: 'A page on ' + domain + ' was updated.',
          url: url
        });
      }

      setHash(url, hash);
    });
  }

  getFuzzedVersionStrings(version) {}

  getHash(source) {
    return _crypto.default.createHash('md5').update(source).digest('hex');
  }

}

var _default = WatchJavascriptSource;
exports.default = _default;