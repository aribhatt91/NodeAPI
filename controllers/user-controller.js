var helper = require('../config/helper.js');

var users = {};
var max_user_id = 0;

module.exports = function (server) {
    server.get('/user/:id', function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors[0], 400);
        } else if (!users[parseInt(req.params.id)] || typeof (users[parseInt(req.params.id)]) == 'undefined') {
            helper.failure(res, next, "The specified user could not be found", 404);
        } else {
            helper.success(res, next, users[parseInt(req.params.id)]);
        }
    });

    server.get('/', function (req, res, next) {
        helper.success(res, next, users);
    });

    server.post('/user', function (req, res, next) {
        var user = req.body;
        max_user_id++;
        user['id'] = max_user_id;
        users[user.id] = user;

        helper.success(res, next, user);
    });


    server.put('/user/:id', function (req, res, next) {
        var user = users[parseInt(req.params.id)];
        var update = req.body;
        update['id'] = user['id'];
        users[user.id] = user;
        helper.success(res, nexxt, update);
    });

    server.del('/user/:id', function (res, req, next) {
        delete users[parseInt(res.params.id)];
        helper.success(res, next, users);
    });
}