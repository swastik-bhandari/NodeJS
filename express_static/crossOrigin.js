const express = require('express');
const path = require('path');
const errorHandler = require('../eventEmitter/logs/errorHandler.js');
const {v4 : uuid} = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const cors = require('cors');
const {logger} = require('../eventEmitter/logEvents.js');
const { error } = require('console');
const corsOptions = require('../config/cors.js');

const app = express();


app.use('/' ,cors(corsOptions));
const PORT = process.env.PORT || 3500;
app.use('/' ,logger);

app.use(express.static('express_static/public'));

app.get('/' , (req , res)=> {
  console.log('hellooooo');
})

app.use(errorHandler);

app.listen(PORT);