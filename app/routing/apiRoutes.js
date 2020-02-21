// Requiring data
const friendsArray = require('../data/friends.js');

// Routing
module.exports = function(app) {
    //API GET request
    app.get('/api/friends', function(req, res) {
        res.json(friendsArray);
    });

    //API POST request
    app.post('/api/friends', function(req, res) {
        // New friend object
        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        var scoresArray = [];
        // Obtain the new friend scores and parse them into integers
        for (var i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]));
        };
        newFriend.scores = scoresArray;

        // Default position for best match is position 1
        var bestMatchPosition = 0;
        var minimumDifference = 40;

        // Loop through the friends array
        for (let i = 0; i < friendsArray.length; i++) {
            // initial total differdnce is 0 
            let totalDifference = 0;

            // Loop through the scores of the array of friends
            // Find the absolute difference between the scores of the new user
            for (let j = 0; j < friendsArray[i].scores.length; j++) {
                let difference = Math.abs(newFriend.scores[j] - friendsArray[i].scores[j]);
                // Add the difference of each question to the total difference 
                totalDifference += difference;
            };

            // The new best match will be whoever has the minimum difference
            if (totalDifference < minimumDifference) {
                bestMatchPosition = i;
                minimumDifference = totalDifference;
            };
        };

        // After finding a match, push the new friend to the friends array
        friendsArray.push(newFriend);

        // Send to browser the new match
        res.json(friendsArray[bestMatchPosition]);
    });
};