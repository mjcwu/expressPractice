var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){
  var config = require('./config.json');
  // use variables of a properties use []
  // this return { PORT: 3000, MONGODB_URL: 'mongodb://localhost:27017/TodoApp' }
  var envConfig = config[env]

  // this return the key of variable in array
  // return [ 'PORT', 'MONGODB_URL' ]
  // console.log(Object.keys(envConfig));
  Object.keys(envConfig).forEach((key)=>{
    // process.env gives key value pairs of environmental variables
    // following code change the environmental value of a key PORT and adding mongodb_url: value pair
    process.env[key]=envConfig[key];
  })
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
