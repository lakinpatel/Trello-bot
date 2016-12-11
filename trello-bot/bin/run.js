'use strict'

const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");
const server = http.createServer(service);

const witToken = '573Z5CQL36KANPMZ32OKOSGOEOFFODXO'
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-114152323796-QG6MKikmPWfaEvoxlP3iJ326';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3030));

server.on('listening', function() {
    console.log(`trello-bot is listening on ${server.address().port} in ${service.get('env')} mode. `);
});