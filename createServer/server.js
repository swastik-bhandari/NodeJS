const logEvents = require('./../eventEmitter/logEvents.js');
const EventEmitter = require('events');

class MyEvent extends EventEmitter{};

const eventEmitter = new MyEvent();

eventEmitter.on('serverHandling' , (msg)=>{
  console.log('k xa hal khabaar')
  logEvents(msg);
});

const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const serveFile = async (filePath , contentType , response) => {

try {
  const rawData = await fsPromises.readFile(filePath ,!contentType.includes('image')? 'utf8':'');
  const data = contentType==='application/json' ? JSON.parse(rawData) : rawData;
  response.writeHead( path.basename(filePath)==='404.html'?404: 200 ,{
    'content-type': contentType
  } );

  response.end(
    contentType ==='application/json' ? JSON.stringify(data) : data
  );

} catch ( err) {
  eventEmitter.on(`${err.name}:\t${err.msg}`);
  console.log(`error in response : ${err}`);
  response.statuscode = 500;
}
};


const server = http.createServer((req , res)=> {
console.log(req.url , req.method);
const extension = path.extname(req.url);
let contentType;
 
switch (extension) {
  case '.json': 
    contentType = 'application/json';
    break;
  case '.txt':
    contentType = 'text/plain';
    break;
  case '.jpg':
    contentType = 'image/jpeg';
    break;
  case '.png':
    contentType = 'image/png';
    break;
  case '.html':
    contentType = 'text/html';
    break;
  case '.css':
    contentType = 'text/css';
    break;
  case '.js': 
    contentType = 'text/javascript';
    break;
  default:
    contentType = 'text/html';
}
console.log('hello1');
let filePath = (contentType ==='text/html' && req.url ==='/')?
path.join(__dirname ,'..', 'views','index.html'):(contentType ==='text/html' && req.url.slice(-1)==='/')?
path.join(__dirname , '..','views', req.url ,'index.html'):(contentType ==='text/html')?
path.join(__dirname , '..','views' , req.url):path.join(__dirname ,'..',req.url);
console.log('hello2');

// make .html extension not required in the browser .
if(!extension && req.url.slice(-1)!=='/') filePath += '.html';

const fileExists = fs.existsSync(filePath);
console.log(filePath);
if(fileExists) {
  eventEmitter.emit('serverHandling' ,`${req.url}:\t${req.method}`);
  console.log(filePath);
  serveFile(filePath , contentType , res);
}
else {
  console.log('hello3');
  if(path.basename(filePath) === 'old-page.html') {
    eventEmitter.emit('serverHandling',`${req.url}:\t${req.method}\tredirect`);
    res.writeHead(301 , {'location' : './new-page.html'});
    res.end();
  }
  else {
    eventEmitter.emit('serverHandling',`${req.url}:\t${req.method}\t404error`);
    serveFile(path.join(__dirname , '..', 'views' , '404.html') , 'text/html' , res);
  }
}
});


const PORT = 3000;

server.listen(PORT , (msg)=> {
console.log(`listening on port : ${PORT}`);
});