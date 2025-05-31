const fs = require('fs');
const fsPromises = require('fs').promises
const { format } = require('date-fns');
const {v4 : uuid} = require('uuid');
const path = require('path');


const logEvents = async (message , path_param = 'logFile.txt') => {
  const dateTime = `${format(new Date() , 'yyyy/MM/dd\tHH:mm:ss')}`;
  const logItems = `${dateTime}\t${uuid()}\t${message}\n`;
  if(!fs.existsSync(path.join(__dirname , 'logs'))) {
    fs.mkdirSync(path.join(__dirname , 'logs'));
  }
  try {
    await fsPromises.appendFile(path.join(__dirname , 'logs' ,path_param) , logItems);
  }
  catch(err) {
    console.error(`error in code :${err}`);
  }
}

 const logger = (req , res , next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`);
  console.log('middleware1');
  // next(new Error('logger error'));
}

module.exports = {logger , logEvents};