var http = require('http');

http.createServer(function (request, response) {

    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end('Hello World\n');
}).listen(80, "13.75.89.62");

console.log('Server running...');