let _respond = (res, next, status, data, http_code) => {
    var response = {
        'status': status,
        'status-code': http_code,
        'data': data
    };
    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    res.send(JSON.stringify(response));
    return next();
}

module.exports.success = (res, next, data) => {
    _respond(res, next, 'success', data, 200);
};

module.exports.failure = (res, next, data, http_code) => {
    _respond(res, next, 'failure', data, http_code);
};