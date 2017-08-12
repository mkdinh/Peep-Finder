//Loading express module and router export from other js files 

var express = require('express'),
    htmlRoutes = require('./app/routing/htmlRoutes.js'),
    apiRoutes  = require('./app/routing/apiRoutes.js');

var bodyParser = require('body-parser');

// Initializing App with express 
var app = express();
var PORT = 3000;


// parsing req data
app.use(bodyParser.json()); // parsing js -> JSON
app.use(bodyParser.urlencoded({extended:true})); // parsing app form-urlencoded

// setting routes for seperate js files
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// listen on specify port
app.listen(PORT, function(){
    console.log('listen on port:', PORT)
})