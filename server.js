require('dotenv').config();
//var http = require('http');
const restify = require('restify');
const restifyValidator = require('restify-validator');
const restifyController = require('./controllers/restify-controller');
//const expressController = require('./controllers/express-controller');
const userRoute = require('./routes/userRoute');


//const url = require('url');
//const events = require('events');
//const eventEmitter = new events.EventEmitter();
//const session = require('express-session');
//Database
//const MongoClient = require('mongodb').MongoClient;
const dbConnect = require('./database/db-connect');
//const db_url = 'mongodb://localhost:27017/test';
const mongoose = require('mongoose');
//const studentTable = require('./database/student.db');

//Express
//const express = require('express');
//const app = express();
//const bodyParser = require('body-parser');
//const router = express.Router();

//Setting up Restify server
const server = restify.createServer({ name: 'myapp', version: "1.0.0" });

dbConnect(mongoose, process.env.DB_URI);

const student = {
    _regNo: '1560011005',
    _firstName: 'Golu',
    _lastName: 'Bhattacharjee',
    _regYear: '2012',
    _semester: '8',
    _department: 'IT',
    _specialization: 'BTECH'
};
//studentTable.init(mongoose);
//studentTable.createRow(student);
//studentTable.fetchAll();

module.exports.startRestify = () => {
    restifyController(server, restify, restifyValidator, 10081);
    userRoute(server, null);
};

// module.exports.startExpress = () => {
//     expressController(app, bodyParser);
// };