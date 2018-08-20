'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');

const port = process.env.PORT || 3000;
const server = express();

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/api/:name', (req, res) => {
    let dataPath;
    switch(req.params['name']) {
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
});

server.listen(port, () => {
    console.log('Start server at ' + port);
});