const Logger = require('./logger');
const logger = new Logger();

// Register a listener for the messageLogged event
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

// Call the log method, which emits the event
logger.log('message');