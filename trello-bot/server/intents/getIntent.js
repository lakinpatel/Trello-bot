'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'get') {
        return cb(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    }
    
    var toget = intentData.get[0].value;
    var lists = "";
    var url;
    var message = "";

    if(toget == 'lists'){
        url = 'http://localhost:3000/boards/583a6a7bee8b76fdb68c6f12/lists';
        message = 'Following are the lists on Board';
    }else if(toget == 'cards'){
        url = 'http://localhost:3000/lists/583a6ae3d17b388bd61a3730/cards';
        message = 'Following are the cards in lists';
    }

    request.get(url, (err, res) => {
        if(err || res.statusCode != 200 || !res.body) {
            //console.log(err);
            return cb(false, `I had a problem find out the lists`);
        }
        res.body.forEach(function(element) {
                lists += element['name'] + ",";
            }, this);
            console.log(lists);
        return cb(false, `${message} : ${lists}`);
    });

}