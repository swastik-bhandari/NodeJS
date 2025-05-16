const fs = require('node:fs');

// fs.readFile('./stater.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// }); 
const path = require('path');

// fs.readFile(path.join(__dirname , 'starter.txt'), 'utf8' , (err, data) => {
//   if (err) throw err;
//   console.log(data);
// }); 

//console.log(path.join(__dirname,'starter.txt'));

process.on('uncaughtException' , error => {
  console.error(`there was an uncaught error : ${error} `);
  process.exit(1);
})

fs.writeFile(path.join(__dirname , 'reply.txt') ,'i am writing to the file' , (err) => {
  if (err) throw err;
  console.log("i wrote in the file successfully !");
  fs.appendFile(path.join(__dirname , 'reply.txt') , ' ok , go ahead' ,(err) => {
    if(err) throw err;
    console.log('append successful');
  })
}); 

///////////////////////////// i am writing append inside the writeFile operation because in async functions, we dont know which will be executed first , so appendFile fuction inside writeFile is a smart move . ///////////////////////////////


