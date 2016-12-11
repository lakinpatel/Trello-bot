'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'add') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }
    console.log(intentData);
    /*
    if(!intentData.message_subject) {
        return cb(new Error(`Missing location in time intent`));
    }
*/
    //const location = intentData.location[0].value;
    //var lists = "";
    var cardname = intentData.add[0].value;
    request.get(`http://localhost:3000/cards/sdsd/`+ cardname, (err, res) => {
        if(err || res.statusCode != 200 || !res.body) {
            //console.log(err);
            return cb(false, `I had a problem find out the lists`);
        }
        return cb(false, `In, it is now ${lists}`);
    });

}