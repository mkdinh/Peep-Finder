// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// Loading modules for router export and parsing request url
var express = require('express')
var router = express.Router();
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs');

// -------------------------------- GET -----------------------------------

// A GET route that will display a JSON of all possible friends
router.get('/friends', function(req,res){
    reqAll(req,res)
});

var reqAll = function(req,res){
    // Get path to friendlist JSON file
    var friendlist = path.join(__dirname,'../data/friends.js');

    // send file to browser
    return res.sendFile(friendlist)
};
// -------------------------------- POST -----------------------------------
// A POST route that will display incoming survey results and compatibility logics
router.post('/friends',function(req,res){
    reqResults(req,res)
});

var reqResults = function(req,res){
    var newFriend = req.body;
    res.json(newFriend)
   
    // Update JSON file with new object
    updateList(newFriend)
};

// Matching logic --------------------------------

// Update List --------------------------------
var updateList = function(obj){
    // Get path to friendlist JSON file
    var filePath = path.join(__dirname,'../data/friends.js');

    // read JSON file
    fs.readFile(filePath,'utf8', function(err,data){
        if(err) throw err;
        var list = JSON.parse(data) 
        console.log(typeof list)
        // push new object into local array and rewrite file
        addFriends(list,obj)
    })
}

// Write to File --------------------------------
var addFriends = function(array,element){
    
    // add new user to friend arrays
    array.push(element);

    // stringify friendList prior to rewrite
    array = JSON.stringify(array,null,2);

    // rewrite json file with user
    fs.writeFile(path.join(__dirname,'../data/friends.js'), array, 'utf8', function(err){
        if(err) throw err;
        console.log('friend added!')
    })
}

// export router to be connected to server.js
module.exports = router;