// console.log('hello world');
// const os = require('os');
// console.log(os.version());
// console.log(os.homedir());
// console.log(os.type());
// console.log(__dirname);
// console.log(__filename);
// const path = require('path');
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename)); // returns object 

// {  ********* path.parse(__filename) return an object as below *************
//   root: 'C:\\',
//   dir: 'C:\\Users\\ACER\\OneDrive\\Desktop\\nodeJS',
//   base: 'server.js',
//   ext: '.js',
//   name: 'server'
// }


///////////////////// importing functions in math.js in server.js file ///////////////////////////

// const math = require('./math');

// console.log(math.sum(5,3));

////////////////////////////////////////////////////////

const {sum , sub , mul , div} = require('./math');

console.log(sub(5,3));
