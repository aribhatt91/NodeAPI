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
        req.assert('first_name', 'First name is required').notEmpty()
        req.assert('last_name', 'Last name is required').notEmpty();
        req.assert('email', 'Email id is required').notEmpty().isEmail();
        req.assert('career', 'Career must be either student or teadcher').notEmpty().isIn(['student', 'teacher', 'professor']);
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors, 400);
        } else {
            var user = req.body;
            max_user_id++;
            user['id'] = max_user_id;
            users[user.id] = user;
            helper.success(res, next, user);
        }
    });


    server.put('/user/:id', function (req, res, next) {
        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        var user = users[parseInt(req.params.id)];
        if (errors || typeof user === 'undefined') {
            helper.failure(res, next, 'The specified user couldn\'t be found', 404);
        } else {
            var update = req.body;
            for (var field in update) {
                user[field] = update[field];
            }
            //users[user.id] = user;
            helper.success(res, nexxt, user);
        }
    });

    server.del('/user/:id', function (res, req, next) {
        if (typeof user === 'undefined') {
            helper.failure(res, next, 'The specified user couldn\'t be found', 404);
        } else {
            delete users[parseInt(res.params.id)];
            helper.success(res, next, users);
        }
    });
};