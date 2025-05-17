const fs = require('fs').promises
const path = require('path');
const fileOps = async() => {

  try {
   const data = await fs.readFile(path.join(__dirname , 'starter.txt') , 'utf8' );
   console.log(data);
   await fs.unlink(path.join(__dirname , 'starter.txt'));
    await fs.writeFile(path.join(__dirname , 'conversation.txt'), 'coding is fun');
    await fs.appendFile(path.join(__dirname , 'conversation.txt') , '\nyes i love coding');
    await fs.rename(path.join(__dirname ,'conversation.txt'), 'starter.txt');
    const newdata = await fs.readFile(path.join(__dirname , 'starter.txt') , 'utf8' );
    console.log(newdata);
    
  }
  catch (err){
 console.error(`caught an error : ${err}`);
  }
}
fileOps();