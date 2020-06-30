module.exports = (server, restify, restifyValidator, port) => {
    server.listen(port, () => {
        console.log('%s listening at %s', server.name, server.url);
    });
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.queryParser());
    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.urlEncodedBodyParser());
    server.use(restifyValidator);
};