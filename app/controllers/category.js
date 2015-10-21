var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Word = mongoose.model('Word'),
    _ = require('lodash');

module.exports = function(app){
  app.use('/api/category', router);
};

// import categories
router.post('/', function(req, res){
  Category.remove({ user_id: req.user_id}, function(err){});
  Word.remove({ user_id: req.user_id}, function(err){});

  // add user id to objects
  var categories = _.map(req.body.categories, function(element) {
    return _.extend({}, element, {user_id: req.user_id});
  });

  // add user id to objects
  var words = _.map(req.body.words, function(element) {
    return _.extend({}, element, {user_id: req.user_id});
  });

console.log(words);
  //Category.create(categories);
  //Word.create(words);

  res.end();
});
//
//{
//  "categories" : [
//  {
//    "client_id": 1,
//    "name": "niglect",
//    "wordCount": 12
//  },
//  {
//    "client_id": 2,
//    "name": "approach",
//    "wordCount": 11
//  },
//  {
//    "client_id": 3,
//    "name": "test",
//    "wordCount": 9
//  },
//  {
//    "client_id": 4,
//    "name": "abandon",
//    "wordCount": 8
//  }
//],
//  "words" : [
//  {
//    "test" : "test"
//  }
//]
//}
