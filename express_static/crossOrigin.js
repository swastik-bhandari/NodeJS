const express = require('express');
const path = require('path');
const errorHandler = require('../eventEmitter/logs/errorHandler.js');
const {v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const cors = require('cors');
const {logger} = require('../eventEmitter/logEvents.js');
const { error } = require('console');

const whiteList = ['http://localhost:3500' , 'https://www.google.com'];

const consOptions = {
  origin : (origin , callback) => {
    if( whiteList.includes(origin)) {
      callback(null , true);
    }
    else {
      callback(new Error('Not allowed by CORS') , false);
    }
  },
  credentials : true,
  methods : ['POST', 'GET','DELETE', 'PUT']
}

const app = express();


app.use('/' ,cors(consOptions));
const PORT = process.env.PORT || 3500;
app.use('/' ,logger);

app.use(express.static('express_static/public'));

app.get('/' , (req , res)=> {
  console.log('hellooooo');
})

app.use(errorHandler);

app.listen(PORT);