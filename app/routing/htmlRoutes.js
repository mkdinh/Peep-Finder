
// 3. Your `htmlRoutes.js` file should include two routes:

//    * A GET Route to `/survey` which should display the survey page.
//    * A default USE route that leads to `home.html` which displays the home page

// Loading modules for router export and parsing request url
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var path = require('path');
var fs = require('fs');

// set router for homepage address and read off index.ejs
router.get('/', function(req,res){
//    reqHome(req,res)
    res.render('index');
});


// set router for survey page to read off survey.ejs
router.get('/survey', function(req,res){
    reqSurvey(req,res);
});

var reqSurvey = function(req,res){
    res.render('survey');
};
// set router for friends page to fread of friends.ejs
router.get('/list', function(req,res){
    reqFriends(req,res);
})

var reqFriends = function(req,res){
    // determine path for file
    var filePath = path.join(__dirname,'../data/friends.json');
    // read JSON file
    fs.readFile(filePath,'utf8', function(err,data){
        if(err) throw err;
        data = JSON.parse(data);
        
        // render friends js to browser with list of friends
        res.render('list',{"list": data})
    })

}

// export routes to connect to server.js 
module.exports = router;