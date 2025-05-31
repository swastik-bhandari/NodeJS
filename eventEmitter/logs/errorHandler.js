const {logEvents} = require('../logEvents.js');
const errorHandler = (err , req , res , next)=> {
  console.log(`${err.name}\t ${err.message}`);
  console.error(err.stack);
  logEvents(`${err.name}\t${err.message}` , 'errorlog.txt');
  res.status(500).send(err.message);
}
module.exports = errorHandler;