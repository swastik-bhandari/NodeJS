const fs = require('fs');
const fsPromises = require('fs').promises
const { format } = require('date-fns');
const {v4 : uuid} = require('uuid');
const path = require('path');


const logEvents = async (message) => {
  const dateTime = `${format(new Date() , 'yyyy/MM/dd\tHH:mm:ss')}`;
  const logItems = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItems);
  if(!fs.existsSync(path.join(__dirname , 'logs'))) {
    fs.mkdirSync(path.join(__dirname , 'logs'));
  }
  try {
    await fsPromises.appendFile(path.join(__dirname , 'logs' ,'logFile.txt') , logItems);
  }
  catch(err) {
    console.error(`error in code :${err}`);
  }
}
module.exports = logEvents;