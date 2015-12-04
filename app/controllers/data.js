var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Word = mongoose.model('Word'),
    _ = require('lodash');

module.exports = function(app){
  app.use('/api/data', router);
};

// import data
router.post('/import', function(req, res){

  //delete exist data
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

  Category.create(categories);
  Word.create(words, function () {
    res.end();
  });

  //res.end();
});
