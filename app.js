'use strict';

const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const server = express();

// middleware static files
server.use('/style', express.static(__dirname + '/styles'));
server.use('/image', express.static(__dirname + '/images'));

// parse the http body into json
server.use(bodyParser.json());

// middleware log the request header;
server.use('/', (req, rest, next) => {
    console.log('request header: ' + req.rawHeaders);
    next();
});

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/api/:name', (req, res) => {
    let dataPath;
    switch(req.params.name) {
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

server.post('/api/sneaker', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.send('Hello ' + req.body.brand);
});

server.listen(port, () => {
    console.log('Start server at ' + port);
});