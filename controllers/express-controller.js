var helper = require('../config/express-helper');
module.exports = (server, bodyParser) => {
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());

    server.listen(3000);

    server.get('/', (req, res, next) => {});

    server.use((err, req, res, next) => {
        console.log(err);
    });
};