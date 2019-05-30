import request from 'request';
import { CommandTrigger } from 'klaus';

class TriviaCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'trivia';
    this.sessionQuestion = {};
    this.urlBase = 'https://opentdb.com/api.php';
  }

  handleCommand = (commandString) => {
    if (!this.sessionQuestion) {
        const updateSessionQuestion = this.updateSessionQuestion;
        const sessionQuestion = this.sessionQuestion;
        var url = url_base + '?amount=1&type=multiple';
        request(url, function(error, response, body) {
            var results = JSON.parse(body).results;
            if (results && results.length > 0) {
                sessionQuestion = results[0];
                var options = sessionQuestion.incorrect_answers;
                options.push(sessionQuestion.correct_answer);
                sessionQuestion.options = shuffle(options);
                var response = "== Trivia ==\n";
                response += convertHTML(sessionQuestion.question) + '\n';
                for (var i = 0; i < sessionQuestion.options.length; i++) {
                    response += (i + 1) + ') ' + convertHTML(sessionQuestion.options[i]) + '\n';
                }
                response += '\nThis question will expire in 60 seconds.';
                setTimeout(function() {
                    updateSessionQuestion(undefined);
                }, 60 * 1000);

                return;
                return callback(response);
            }
            return callback('An error occurred while fetching a trivia question.');
        });
    } else {
        var userResponse = parseInt(commandString);
        if (!userResponse || userResponse > 4 || userResponse == 0) {
            return callback('');
        }
        if (sessionQuestion[userResponse - 1] == sessionQuestion.correct_answer) {
            return callback('Correct!')
            sessionQuestion = undefined;
        } else {
            return callback('Wrong!')
        }
    }
  }

  updateSessionQuestion = (question) => {
      this.sessionQuestion = question;
  }

}

export default TriviaCommand;




exports.commandString = 'trivia';
exports.execute = function (commandString, callback) {
}


/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function convertHTML(str) {
    var entityPairs = [
        {character: '&', html: '&amp;'},
        {character: '<', html: '&lt;'},
        {character: '>', html: '&gt;'},
        {character: "'", html: '&apos;'},
        {character: '"', html: '&quot;'},
    ];

    entityPairs.forEach(function(pair){
        var reg = new RegExp(pair.character, 'g');
        str = str.replace(reg, pair.html);
    });
    return str;
}
