var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){
  app.use('/api/user', router);
};

// user register
router.post('/signup', function(req, res){

  //generate token
  var token = req.body.username + new Date().getTime();
  req.body.token = crypto.createHash('sha1').update(token).digest('hex');
  var user = new User(req.body);

  user.save(function(err) {
    if (err){
      res.status(500).send(err);
    }else{
      res.json({token : user.token});
    }
  });

});

// user login
router.post('/signin', function(req, res){

  User.findOne({
    username: req.body.username
  }, function(err, user){

    if(err || !user){
      res.status(401).send({success: false, message: "invalid username or password"});
    }else{
      user.caomparePass(req.body.password, function(err, authenticated){
        if(!err && authenticated){
          res.json({token : user.token});
        }else{
          res.status(401).send({success: false, message: "invalid username or password"}).end();
        }
      });
    }

  });

});

router.route('/')
  .post(function(req, res){
    res.json({ "rest" : "post" });
  });
