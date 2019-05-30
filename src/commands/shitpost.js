import request from 'request';
import { CommandTrigger } from 'klaus';

class ShitpostCommand extends CommandTrigger {
  constructor(bot, options) {
    super(bot, options);
    this.commandString = 'shitpost';
  }

  handleCommand = (commandString) => {
    const bot = this.bot;
    request('https://www.reddit.com/r/copypasta/.json', function(error, resp, body) {
      var posts = JSON.parse(body).data.children;
      var post = posts[Math.round(Math.random() * posts.length) - 1];
      if (post && post.data && post.data.selftext) {
        bot.sendMessage({text: post.data.selftext});
      }
    })
  }
}

export default ShitpostCommand;