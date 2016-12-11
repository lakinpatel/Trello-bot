'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'cards') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }
    
    //const location = intentData.location[0].value;
    var lists = "";
    request.get(`http://localhost:3000/lists/583a6ae3d17b388bd61a3730/cards`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body) {
            //console.log(err);
            return cb(false, `I had a problem find out the lists`);
        }
        res.body.forEach(function(element) {
                lists += element['name'] + ",";
            }, this);
            console.log(lists);
        return cb(false, `In, it is now ${lists}`);
    });

}