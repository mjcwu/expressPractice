// sha256 bit, hashing function
const {SHA256} = require('crypto-js');

// npm i jsonwebtoken --save
const jwt = require ('jsonwebtoken');

// npm i bcryptjs -- save (for salt)
const bcrypt = require('bcryptjs');

const paswsword = '123abc!';

// first argument # of round to salt password
bcrypt.genSalt(10, (err, salt)=>{
  // first, thing to hash
  // second, salt is to use
  // hash = hash value
  bcrypt.hash(password, salt, (err,hash)=>{
    console.log()
  })
})

const hashedPassword = "";

// compared password to hashed password and res (response)
//  if it's true or not
// bcrypt only support callback, not promises
bcrypt.compare(password, hashedPassword, (err, res)=>{
  console.log(res)
})

// ----------- examples (using SHA256) ---------------
if(false){
  
  // two methods from jsonwebtoken
  const data = {
    id: 10
  }
  // sending token by adding salt '123abc'
  const token = jwt.sign(data, '123abc')
  
  // verify
  const decoded = jwt.verify(token, '123abc')

  const message = "I am user number 3";
  // SHA(message) give hashing object, toString convert to string
  const hash = SHA256(message).toString();
  
  
  // send back to user
  const data = {
    id: 4
  };
  const token = {
    // data: data;
    data,
    // + 'somesecrete' is adding salting so the user can't manipulate token hash
    hash: SHA256(JSON.stringify(data) + 'somesecrete').toString()
  }
  
  const resultHash = SHA256(JSON.stringify(token.data)+'somesecrete').toString();
  if(resultHash === token.hash){
    console.log('Data is not compromised')
  } else {
    console.log('Data is BREACHED!!')
  }
  
}