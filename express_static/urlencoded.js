const express = require('express');
const path = require('path');
const {v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.static('./express_static/public' , {extensions :['html']}) );

// app.use('/login',(req , res ,next)=> {  // only works for /login route

// })

const preFormHandler = (req , res , next) => {
  console.log('preForm handling');
next();
}

app.post('/index' , express.urlencoded() , preFormHandler ,(req , res)=> {
  console.log(req.body);
  res.send('form submitted');
});
app.listen(PORT);