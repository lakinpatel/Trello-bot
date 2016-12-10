'use strict'

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');
var Trello = require('node-trello');

const trello_key = 'cccb932e96dc2c854ab95d1db3d87a80';
const trello_token = 'ae0283af09920fa848a115733c669a8a8ae1c7c10690846f90dff15ed906600b';

var creationSuccess = function(data) {
  console.log('Card created successfully. Data returned:' + JSON.stringify(data));
};

service.get('/boards/583a6a7bee8b76fdb68c6f12/lists', (req, res, next) => {
    var trello = new Trello(trello_key, trello_token);
    trello.get("/1/boards/583a6a7bee8b76fdb68c6f12/lists", function(err,data){
        res.json(data);
    });
});

service.get('/lists/583a6ae3d17b388bd61a3730/cards', (req, res, next) => {
    var trello = new Trello(trello_key, trello_token);
    trello.get("/1/lists/583a6ae3d17b388bd61a3730/cards", function(err,data){
        res.json(data);
    });
});

service.get('/cards/:listid/:cardname', (req, res, next)=> {
    var listId = "583a6ae3d17b388bd61a3730";//req.params.listid; //583a6ae3d17b388bd61a3730
    var cardname =  req.params.cardname;
    var trello = new Trello(trello_key, trello_token);
    var newCard = 
    {
        name: cardname, 
        desc: "Using the Trello API is fun and easy!",
        pos: "bottom", 
        idList: listId
    };
    trello.post('/1/cards/', newCard, creationSuccess);
});
module.exports = service;