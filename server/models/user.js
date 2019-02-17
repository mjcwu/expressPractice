const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// define new schema
const UserSchema = new mongoose.Schema( {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    // validate email address
    // need third party validator, validator npm package
    validate: { 
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access:{
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});



// JSON.stringify() defers to a customized toJSON() if it exists
// don't need to call it in server.js, automatically calls
UserSchema.methods.toJSON = function(){
  // 'this' object constructor
  // instance method
  const user = this;
  // .toObject take mongoose variable 'user' and convert to regular object
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}


// userschema.methods => object
// generateAuthToken => instance method
// we want to use 'this' keyword, so no arrow function
// .generateAuthToken is customed function
UserSchema.methods.generateAuthToken = function (){
  // 'this', store individual document 
  // create hashing for token
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  // store it
  user.tokens = user.tokens.concat([{access, token}]);

  // save it
  return user.save().then(()=>{
    return token;
  });
}

UserSchema.statics.findByToken = function (token) {
  // model method with this binding 
  const User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, 'abc123')
  } catch (e){
    // return new Promise((response, reject)=>{
    //   reject();
    // })
    // sudo code
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    // query the nested value with ''
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

// salt then hash the password
UserSchema.pre('save', function(next){
  const user = this;
  
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        // replace the user password with hashed password
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

// pass UserSchema as the second argument
const User = mongoose.model('User', UserSchema);

module.exports = {User}
