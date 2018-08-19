'use strict';

const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if(req.method === 'GET') {
        res.writeHead(200, { 'conten-type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }

    let dataPath;
    if(req.method === 'GET' && req.url.startsWith('/api/')) {
        res.writeHead(200, { 'conten-type': 'application/json' });
    
        switch(req.url.replace('/api/', '')) {
            case 'family':
                dataPath = '/data/family.json';
                break;
            case 'friends' :
                dataPath = '/data/friends.json';
                break;
            default:
                dataPath = '/data/default.json';
                break;
        }
        
        fs.createReadStream(__dirname + dataPath).pipe(res);
    }

    // res.writeHead(404);
    // res.end();
    
}).listen(3000, '127.0.0.1');