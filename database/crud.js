var Model, success, failure;
module.exports = {
    init: (_model, _success, _failure) => {
        Model = _model;
        success = _success;
        failure = _failure;
    },
    fetchAll: (...args) => {
        Model
            .find({})
            .sort({ _userId: 'asc' })
            .then((result) => {
                console.log(result);
            });
    },
    createRow: (data, ...args) => {
        Model(data)
            .save()
            .then((item) => {
                console.log('Created a new row...');
            })
            .catch((err) => {
                console.log('Ran into an error', err);
            });
    },
    update: () => {},
    deleteRow: (userId) => {}
};