'use strict';

const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);
    
    res.writeHead(200, { 'conten-type': 'application/json' });
    fs.readFile('data.json', function(err, data) {
        res.write(data);
        res.end();
    });

    // fs.createReadStream(__dirname + '/data.json').pipe(res);
    // res.end();

}).listen(3000, '127.0.0.1');