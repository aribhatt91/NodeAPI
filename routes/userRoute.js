var helper = require('../config/restify-helper');

var users = {};
var max_user_id = 0;
let userModel = require('../database/models/user');
let CRUD = new require('../database/crud');
CRUD.init(userModel, helper.success, helper.failure);

module.exports = (server, db_client) => {
    server.get('/log/:name', (req, res, next) => {
        console.log('Hello, ', req.params.name);
        helper.success(res, next, ('Hello, ' + req.params.name));
        //next();
    });
    server.post('/register/', (req, res, next) => {
        console.log('Hello, ', req.params.name);
        helper.success(res, next, ('Hello, ' + req.params.name));
        //next();
    });
    server.get('/user/:id', (req, res, next) => {
        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors[0], 400);
        } else if (!users[parseInt(req.params.id)] || typeof(users[parseInt(req.params.id)]) == 'undefined') {
            helper.failure(res, next, "The specified user could not be found", 404);
        } else {
            helper.success(res, next, users[parseInt(req.params.id)]);
        }
    });

    server.get('/users', (req, res, next) => {
        helper.success(res, next, users);
    });

    server.post('/user', (req, res, next) => {
        req.assert('first_name', 'First name is required').notEmpty().isAlpha();
        req.assert('last_name', 'Last name is required').notEmpty();
        req.assert('email', 'Email id is required').notEmpty().isEmail();
        req.assert('contact', 'Contact id is required').notEmpty();
        //req.assert('contact', /^\d{10}$/);
        //req.assert('contact', 'Career must be either student or teadcher').notEmpty().isIn(['student', 'teacher', 'professor']);
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


    server.put('/user/:id', (req, res, next) => {
        req.assert('id', 'Id is required and must be numeric').notEmpty().isInt();
        var errors = req.validationErrors();
        var user = users[parseInt(req.params.id)];
        if (errors || typeof user === 'undefined') {
            helper.failure(res, next, 'The specified user couldn\'t be found', 404);
        } else {
            var update = req.body;
            for (let field in update) {
                user[field] = update[field];
            }
            //users[user.id] = user;
            helper.success(res, nexxt, user);
        }
    });

    server.del('/user/:id', (res, req, next) => {
        var user = users[parseInt(req.params.id)];
        if (typeof user === 'undefined') {
            helper.failure(res, next, 'The specified user couldn\'t be found', 404);
        } else {
            delete users[parseInt(res.params.id)];
            helper.success(res, next, users);
        }
    });
};