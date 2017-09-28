var http = require('http');
var restify = require('restify');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var db_url = '';

var users = {};
var max_user_id = 0;

var server = restify.createServer({
    name: 'myapp',
    version: "1.0.0"
});

server.listen(8888, function () {
    console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser());

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello Node! ' + req.url);
// }).listen(8080);

server.get('/user/:id', function (req, res, next) {
    res.setHeader('content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
    return next();
});

server.post('/user', function (req, res, next) {
    var user = req.body;
    max_user_id++;
    user['id'] = max_user_id;
    users[user.id] = user;
    res.setHeader('content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(user));
    return next();
});


server.put('/user/:id', function (req, res, next) {
    var user = users[parseInt(req.params.id)];
    var update = req.body;
    update['id'] = user['id'];
    users[user.id] = user;
    res.setHeader('content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(update));
    return next();
});

server.del('/user/:id', function (res, req, next) {
    delete users[parseInt(res.params.id)];
    res.setHeader('content-type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(users));
    return next();
});

function respond(req, res, next) {
    res.send('hello ' + res.params.name);
    return next();
}