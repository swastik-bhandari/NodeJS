const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = function (req ,res , next) {
    const authHeader = req.headers['authorization']; // divided into scheme and credentials saperated by space 
    if(!authHeader) return res.sendStatus(401);

    const [scheme,credentials] = authHeader.split(' ');

    switch(scheme) {
      case 'Basic':
        console.log('Basic');
        break;
      case 'Bearer':
        console.log('Bearer');
         jwt.verify(
          credentials,
          process.env.ACCESS_TOKEN_SECRET,
          (err , decoded)=> {
            if(err) return res.sendStatus(401);

            ////// no error occured ///
            req.username = decoded.username;
            next();
          }
        )
        break;
      default :
       console.log('unknown scheme');

    }
}

module.exports = {verifyJWT};