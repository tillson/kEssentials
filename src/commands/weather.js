import chrono from 'chrono-node';
import request from 'request';


import { CommandTrigger } from 'klaus';

class ClapCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'weather';
    this.COORDINATES = this.options.coordinates ? this.options.coordinates : "45.5155,122.6793"
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

export default ClapCommand



exports.commandString = 'weather';


exports.execute = function (commandString, callback) {
    var query = commandString.toLowerCase();
    var date = chrono.parseDate(query);
    if (!date) {
        date = new Date();
    }
    if (!process.env["DARKSKY_KEY"]) {
        return callback("Unable to fufill request.  Darksky API key is missing.");
    }
    var epochSeconds = Math.round(date.getTime() / 1000);
    request('https://api.darksky.net/forecast/' + process.env.DARKSKY_KEY + '/' + COORDINATES + ',' + epochSeconds, function (error, resp, body) {
        var json = JSON.parse(body);
        if (!json) { return; }
        var response = '';
        if (json.currently.icon == "rain") {
            response += "Uh oh you should bring an umbrella tomorrow ☔\n"
        } else if (json.currently.temperature < 60.0) {
            response += "it's gonna be COLD COLD COLD COLD COLD tomorrow wear a jacket 🧥🧥\n"
        } else if (json.currently.temperature > 80.0) {
            response += "it's gonna be hotter than Topeka tomorrow! try to keep cool!\n"
        } else {
            response += json.currently.summary + ".";
        }
        response += " Average temperature of " + Math.round(json.currently.temperature) + "˚. Forecast is for " + date.formatTime() + ".";
        callback(response);
    });
};

Date.prototype.formatTime = function() {
    var string = ""
    string += (this.getHours() > 12 ? this.getHours() - 12 : this.getHours());
    string += ":" + (this.getMinutes() >= 10 ? this.getMinutes() : "0" + this.getMinutes());
    string += (this.getHours() > 12 ? "PM" : "AM");
    return string;
}