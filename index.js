var http = require('http');
var restify = require('restify');
var restifyValidator = require('restify-validator');
var setupController = require('./controllers/setup-controller.js');
var userController = require('./controllers/user-controller.js');

var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var db_url = 'mongodb://localhost:27017/test';

var users = {};
var max_user_id = 0;

var server = restify.createServer({
    name: 'myapp',
    version: "1.0.0"
});

setupController(server, restify, restifyValidator);
userController(server);
