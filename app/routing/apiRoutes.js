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
    var friendlist = path.join(__dirname,'../data/friends.json');

    // send file to browser
    return res.sendFile(friendlist)
};

// -------------------------------- POST -----------------------------------
// A POST route that will display incoming survey results and compatibility logics

router.post('/friends',function(req,res){
    // handle request call from ajax
    reqResults(req,res)
});

var reqResults = function(req,res){
    // grab object from req body
    var newFriend = req.body;

    // convert score elements from string to array
    newFriend.scores = newFriend.scores.map(Number);

    // match friend using survey scores and update js files
    var match = matchFriend(newFriend,req,res)

};

// read json file and run a callback function
var readJSON = function(fn){
    // determine path for file
    var filePath = path.join(__dirname,'../data/friends.json');
    // read JSON file
    fs.readFile(filePath,'utf8', function(err,data){
        if(err) throw err;
        fn(data);
    })
}

// Matching logic --------------------------------
var matchFriend = function(obj,req,res){
    var scores = obj.scores;

    // read JSON file
    readJSON(function(data){

        var list = JSON.parse(data);
        var friendScore = [];
        
        for(var i = 0; i < list.length; i++){
            // loop over all the object and calculate the total differences to the user score
            indivScore = calcScore(scores,list[i].scores);

            // push total difference into an array to determine the lowest score
            friendScore.push(indivScore);
        }
        
        // find index of the small score
        var closestIndex = friendScore.indexOf(Math.min(...friendScore));

        // match index of the smallest value on friendScore to list
        var closestMatch = list[closestIndex];

        // sent json object to hmtl as a reponses
        res.json(closestMatch);

        addFriends(list,obj)
        
    })
}

// calculate scores
var calcScore = function(user,friend){
    var diff;
    var diffArray = [];  

    // Calculate differences in individual questions
    for(var j = 0; j < user.length; j++){
        diffArray[j] = Math.abs(user[j]-friend[j]);  
    }

    // calculate total difference and return value
    diff = diffArray.reduce(getSum);    
    return diff
}

// calculate sum of array
function getSum(total,num){
    return total+num
}

// Write to File --------------------------------
var addFriends = function(array,element){
    
    // add new user to friend arrays
    array.push(element);

    // stringify friendList prior to rewrite
    array = JSON.stringify(array,null,2);

    // rewrite json file with user
    fs.writeFile(path.join(__dirname,'../data/friends.json'),array,function(){
        console.log('friend added!')
    })
}

// export router to be connected to server.js
module.exports = router;