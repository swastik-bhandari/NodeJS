const express = require('express');
const path = require('path');
const {v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3500;
app.use((req, res , next)=> {
  console.log(req.url);
  console.log(path.resolve(req.url));
  if(!path.extname(req.url) && req.url!=='/') {
     console.log('hello world');
    req.url+='.html';
  }
  next();
});
app.use(express.static('./express_static/public'));

app.listen(PORT);

