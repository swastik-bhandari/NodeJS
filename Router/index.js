const express = require('express');
const router1 = require('./api/employees.js');
const path = require('path');
const fs = require('fs');

const app = new express();

const PORT = process.env.PORT || 5500;

app.use(express.json());

app.use('/index/employees',router1);




app.listen(PORT);