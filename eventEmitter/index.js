const logEvents =  require('./logEvents.js');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const eventEmitter = new MyEmitter();

///////////// event listening ///////////
eventEmitter.on('logging' , (msg)=> {
logEvents(msg);
});

///////////////// event emitter ////////

eventEmitter.emit('logging' ,'swastik');
