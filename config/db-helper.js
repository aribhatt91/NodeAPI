var assert = require('assert');
module.exports = function(MongoClient, url){
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server.");
      db.close();
    });
}