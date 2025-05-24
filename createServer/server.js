const http = require('http');
const path = require('path');
const fs = require('fs');
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

const filePath = (extension ==='text/html' && req.url ==='/')?
path.join(__dirname , 'views','index.html'):(extension ==='text/html' && req.url.slice(-1)==='/')?
path.join(__dirname , 'views', req.url ,'index.html'):(extension ==='text/html')?
path.join(__dirname , 'views' , url.res):path.join(__dirname , url.res);

// make .html extension not required in the browser .
if(!extension && req.url.slice(-1)!=='/') filePath += '.html';

const fileExists = fs.existsSync(filePath);

if(fileExists) {
  //serve the file
}
else {
  //404 (Not found )
  //or 301 ( redirect)
}
});


const PORT = 3000;

server.listen(PORT , (msg)=> {
console.log(`listening on port : ${PORT}`);
});



