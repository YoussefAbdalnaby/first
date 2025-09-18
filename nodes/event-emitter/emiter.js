const eventemitter = require('events');
const emitter = new eventemitter();

emitter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

emitter.on('greet', () => {
    console.log('Hello there!');
});

emitter.emit('messageLogged', { id: 1, url: 'http://...' });
emitter.emit('greet');

