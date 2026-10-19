const path = require('path');
const os = require('os');
const fs = require('fs');

// Path module parsing
const pathObj = path.parse(__filename);
console.log(pathObj);

// OS module memory check using ES6 template strings
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// Asynchronous file directory reading
fs.readdir('./', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result', files);
});