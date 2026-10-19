const EventEmitter = require('events');

var url = 'http://mylogger.log';

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP request
        console.log(message);

        // Raise an event using 'this'
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

module.exports = Logger;