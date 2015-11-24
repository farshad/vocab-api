var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username:{
    type: String,
    unique: true,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  email:{
    type: String,
    unique: true,
    require: true
  },
  token: {
    type: String
  }
});

//hash password before save
UserSchema.pre('save', function(next){
  var user = this;
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  }else{
    return next();
  }
});

//compare password
UserSchema.methods.caomparePass = function(pass, cb){
  bcrypt.compare(pass, this.password, function(err, authenticated){
    if(err) return cb(err);
    return cb(false, authenticated);
  });
}

module.exports = mongoose.model('User', UserSchema);
