const EventEmitter = require('events');

const event = new EventEmitter();

event.on('greet' , () => {
  console.log('hello world');
});

event.on('greet' , () => {
  console.log('my name is swastik');
});


event.emit('greet');