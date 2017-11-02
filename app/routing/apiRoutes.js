var friends = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;


    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    friends.push(userData);


    res.json(bestMatch);
  });
};



// var friendsArray = require("../data/friends.js");

// module.exports = function (app) {

//   app.get("/api/friends", function(req, res) {
//     res.json(friendsArray);
//   });

//   app.post("/api/friends", function(req, res) {
    
//     var lowestDiff = 1000;
//     var bestMatch = friendsArray[0];
//     
//     function absDiff(num1, num2) {
//       if (num1 > num2) {
//         return num1 - num2;
//       } else if (num2 > num1) {
//         return num2 - num1;
//       } else {
//         return 0;
//       }
//     }
//     
//     for (var i = 0; i < friendsArray.length; i++) {
//       var currentFriendDiff = 0;
//       
//       for (var t = 0; t < friendsArray[i].scores.length; t++) {
//         currentFriendDiff += absDiff(friendsArray[i].scores[t], req.body.scores[t]);
//       }
//       
//       if (currentFriendDiff < lowestDiff && req.body.name != friendsArray[i].name) {
//         lowestDiff = currentFriendDiff;
//         bestMatch = friendsArray[i];
//       }

//     }
//     
//     res.send(bestMatch);
//     
//     friendsArray.push(req.body);
//   });
// }
