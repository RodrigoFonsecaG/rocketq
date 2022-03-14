const express = require('express');
const routes = require('./routes');
const path = require('path');

const server = express();
server.use(express.urlencoded({extended: true}))

server.use(routes);


server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static('public'));


server.listen(3000)