const fs = require('fs');
const path = require('path');
if(!fs.existsSync(path.resolve('..' , './new'))) { // sync stands for synchronous , cannot move to next line until it's done .

  fs.mkdir(path.resolve('..', './new') , (err)=> {
    if(err) throw err;
    console.log('directory created successfully');
  });

}
else {
  fs.rmdir(path.resolve('..','./new'), (err) => {
    if(err) throw err;
    console.log('directory deleted successfully');
  })
}

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// leveling up the directory /////////////////////////
// console.log(path.join(__dirname , '../..'))
// console.log(path.resolve('../..'));