var helper = require('../config/express-helper');
module.exports = (server, bodyParser, port) => {
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.listen(port);
};