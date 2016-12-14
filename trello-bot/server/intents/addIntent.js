'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'add') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }
    console.log(intentData);
    
    var cardname = intentData.add[0].value;
    request.get(`http://localhost:3000/cards/sdsd/`+ cardname, (err, res) => {
        if(err || res.statusCode != 200 || !res.body) {
            //console.log(err);
            return cb(false, `I had a problem find out the lists`);
        }
        console.log(res);
        return cb(false, `${res.body}`);
    });

}