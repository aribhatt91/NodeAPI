var assert = require('assert');
// module.exports = function(MongoClient, url){     MongoClient.connect(url,
// function(err, db) {       assert.equal(null, err); console.log("Connected
// correctly to server.");       db.close();     }); };

module.exports = (mongoose, url) => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(url, {useMongoClient: true})
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log('Ran into Error: ', err);
    });
};