
// 3. Your `htmlRoutes.js` file should include two routes:

//    * A GET Route to `/survey` which should display the survey page.
//    * A default USE route that leads to `home.html` which displays the home page

// Loading modules for router export and parsing request url
var express = require('express')
var router = express.Router();
var bodyparser = require('body-parser')
var path = require('path')

// set router for homepage address and read off index.html
router.get('/', function(req,res){
   reqHome(req,res)
});

var reqHome = function(req,res){
    res.sendFile(path.join(__dirname,'../public/index.html'));
};


// set router for survey page to read off survey.html
router.get('/survey', function(req,res){
    reqSurvey(req,res);
});

var reqSurvey = function(req,res){
    res.sendFile(path.join(__dirname,'../public/survey.html'));
};

// export routes to connect to server.js 
module.exports = router;