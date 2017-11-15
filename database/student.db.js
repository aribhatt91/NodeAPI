require('../models/student');
var Student;
module.exports = {
    init: (mongoose) => {
        Student = mongoose.model('student');
    },
    fetchAll: () => {
        Student
            .find({})
            .sort({_regNo: 'asc'})
            .then((students) => {
                console.log(students);
            });
    },
    createRow: (data) => {
        //var Student = mongoose.model('student');
        new Student(data)
            .save()
            .then((student) => {
                console.log('Created a new row...');
            })
            .catch((err) => {
                console.log('Ran into an error', err);
            });
    },
    deleteRow: (regNo) => {}
};