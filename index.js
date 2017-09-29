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

function respond(res, next, status, data, http_code) {
    var response = {
        'status': status,
        'status-code': http_code,
        'data': data
    };
    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    res.end(JSON.stringify(response));
    return next();
}

function success(res, next, data){
    respond(res, next, 'success', data, 200);
}

function failure(res, next, data, http_code){
    respond(res, next, 'failure', data, http_code);
}

server.get('/user/:id', function (req, res, next) {
    if(!users[parseInt(req.params.id)] || typeof(users[parseInt(req.params.id)]) == 'undefined'){
        failure(res, next, "The specified user could not be found", 404);
    }
    success(res, next, users[parseInt(req.params.id)]);
});

server.get('/users', function (req, res, next) {
    success(res, next, users);
});

server.post('/user', function (req, res, next) {
    var user = req.body;
    max_user_id++;
    user['id'] = max_user_id;
    users[user.id] = user;

    success(res, next, user);
});


server.put('/user/:id', function (req, res, next) {
    var user = users[parseInt(req.params.id)];
    var update = req.body;
    update['id'] = user['id'];
    users[user.id] = user;
    success(res, nexxt, update);
});

server.del('/user/:id', function (res, req, next) {
    delete users[parseInt(res.params.id)];
    success(res, next, users);
});

