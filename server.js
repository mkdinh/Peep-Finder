//Loading express module and router export from other js files 

var express = require('express'),
    htmlRoutes = require('./app/routing/htmlRoutes.js'),
    apiRoutes  = require('./app/routing/apiRoutes.js');

var partials = require('express-partials');
var ejs = require('ejs');
var bodyParser = require('body-parser');

// Initializing App with express 
var app = express();
var PORT =  process.env.PORT || 3000;;

// setting up view engine
app.set('view engine', 'ejs');
app.use(partials());

// parsing req data
app.use(bodyParser.json()); // parsing js -> JSON
app.use(bodyParser.urlencoded({extended:true})); // parsing app form-urlencoded


// set path for external files
app.use(express.static(__dirname + '/app/public'));

app.set('views', __dirname + '/app/views');


app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// setting routes for seperate js files
app.use (function(req,res){
    res.redirect('/')
});

// listen on specify port
app.listen(PORT, function(){
    console.log('listen on port:', PORT)
})