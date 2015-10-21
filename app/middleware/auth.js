var express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var auth = function(app){
  app.use('/api/*', function(req, res, next){

    //allow some routes
    var allow = ['/api/user/signup', '/api/user/signin'];
    if (allow.indexOf(req.baseUrl) > -1) {
      return next();
    }

    //get user token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      User.findOne({
        token: token
      }, function(err, user){
          if(err || !user){
            return res.status(403).send({
              success: false,
              message: 'Invalid token.'
            });
          }else{
            req.user_id = user._id;
            return next();
          }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

  });

}

module.exports = auth;
