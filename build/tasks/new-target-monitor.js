"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _klaus = require("klaus");

var _request = _interopRequireDefault(require("request"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NewTargetMonitor extends _klaus.Trigger {
  constructor(bot) {
    super(bot);

    _defineProperty(this, "queryHackerOne", () => {
      /* HACKERONE STUFF */
      const query = JSON.parse('{"query":"query Directory_page($first_0:Int!,$secure_order_by_1:' + 'FiltersTeamFilterOrder!,$where_2:FiltersTeamFilterInput!,$size_3:ProfilePictureSizes!) ' + '{query {id,...F6}} fragment F0 on Team {resolved_report_count,id} fragment F1 on Team ' + '{_profile_picture1Fh783:profile_picture(size:$size_3),name,handle,submission_state,triage_active,' + 'state,external_program {id},id} fragment F2 on Team {started_accepting_at,id} fragment F3 on Team ' + '{currency,base_bounty,id} fragment F4 on Team {currency,average_bounty_lower_amount,average_bounty_upper_amount,id}' + 'fragment F5 on Team {id,bookmarked} fragment F6 on Query {me {edit_unclaimed_profiles,id},_teams1OYZE0:teams(first:$first_0,' + 'secure_order_by:$secure_order_by_1,where:$where_2) {pageInfo {hasNextPage,hasPreviousPage},edges {node ' + '{id,bookmarked,...F0,...F1,...F2,...F3,...F4,...F5},cursor}},id}","variables":{"first_0":25,"secure_order_by_1":' + '{"started_accepting_at":{"_direction":"DESC"}},"where_2":{"_and":[{"_or":[{"submission_state":{"_eq":"open"}},' + '{"external_program":{"id":{"_is_null":false}}}]},{"external_program":{"id":{"_is_null":true}}},{"_or":[{"state":' + '{"_neq":"sandboxed"}},{"external_program":{"id":{"_is_null":false}}}]},{"state":{"_neq":"soft_launched"}}]},"size_3":"medium"}}');

      try {
        const updateTargets = this.updateTargets;

        _request.default.post('https://hackerone.com/graphql?', {
          json: query,
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': '----' // eZ

          }
        }, function (error, response) {
          if (error) {
            console.log(error);
          } else {
            if (response.body.data && response.body.data.query) {
              const query = response.body.data.query;
              const edges = query[Object.keys(query)[2]];

              if (edges) {
                const targets = edges.edges;
                updateTargets(targets);
              }
            }
          }
        }); // console.log(response);

      } catch (err) {
        console.log(err);
      }
    });

    _defineProperty(this, "updateTargets", targets => {
      var sendMessage = this.data.length > 0;
      const profileKey = this.getProfileKey(targets[0]);

      for (var i = 0; i < targets.length; i++) {
        const target = targets[i].node;

        if (!this.data.has(target)) {
          this.data.add(target);

          if (sendMessage) {
            this.bot.sendMessage({
              channel: process.env.SEC_ALERTS_CHANNEL,
              title: target.name,
              thumbnail: target[profileKey],
              text: target.name + ' just posted a new bug bounty on HackerOne!',
              url: 'https://hackerone.com/' + target.handle,
              username: '🚨 Bounty Alert 🚨'
            });
          }
        }
      }
    });

    this.data = new Set([]);
    this.bot = bot;

    _nodeCron.default.schedule('20 * * * *', this.queryHackerOne);

    this.queryHackerOne();
  }

  getProfileKey(target) {
    var keys = Object.keys(target);

    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('_profile_picture') == 0) {
        return keys[i];
      }
    }
  }

}

var _default = NewTargetMonitor;
exports.default = _default;