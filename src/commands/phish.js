import chrono from 'chrono-node';
import request from 'request';

import { CommandTrigger } from 'klaus';

class PhishCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'phish';
  }

  handleCommand = (commandString) => {
    const bot = this.bot;
    var query = commandString.toLowerCase();
    if (query.indexOf('setlist') > -1 || query.indexOf('play')) {
      var date = chrono.parseDate(query);
      console.log(yyyymmdd(date));
      request('http://phish.in/api/v1/shows/' + yyyymmdd(date),
      {
        headers: { 'Authorization': 'Bearer ' + process.env.PHISH_API }
      },
        function(error, resp, body) {
          var json = JSON.parse(body).data;
          if (!json) { return; }
          var response = json.date + ' ' + json.venue.name + ', ' + json.venue.location + '';
          var sets = [...new Set(json.tracks.map(item => item.set_name))];
          var setSongs = {};
          for (var i = 0; i < sets.length; i++) {
            setSongs[sets[i]] = [];
          }
          for (song of json.tracks) {
            setSongs[song.set_name].push(song);
          }
          for (set of sets) {
            response += '\n' + set + ': ';
            for (var i = 0; i < setSongs[set].length; i++) {
              var song = setSongs[set][i];
              response += song.title
                + (song.duration > (10*1000*60) ? ' (' + Math.round(song.duration/1000/60) + ')' : '')
                + (i == setSongs[set].length - 1 ? '' : ', ');
            }
          }
          response += '\nListen link: ' + 'https://phish.in/' + json.date;
          bot.sendMessage({ text: response });
      });
    }
  }

  yyyymmdd(date) {
    if (!date) {
      return;
    }
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear() + '-',
            (mm>9 ? '' : '0') + mm + '-',
            (dd>9 ? '' : '0') + dd
           ].join('');
  };

}

export default PhishCommand;


