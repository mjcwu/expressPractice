// sha256 bit, hashing function
const {SHA256} = require('crypto-js');

// npm i jsonwebtoken --save
const jwt = require ('jsonwebtoken');

// two methods from jsonwebtoken

const data = {
  id: 10
}
// sending token by adding salt '123abc'
const token = jwt.sign(data, '123abc')

// verify
const decoded = jwt.verify(token, '123abc')


// ----------- examples (using SHA256) ---------------
if(false){

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