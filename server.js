// Dependencies 
var express = require("express");
var path = require("path");

// Set up Express app
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public')));

// Application Routes
require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);

// Start listening on PORT
app.listen(PORT, function() {
    console.log('Friend Finder app is listening on PORT: ' + PORT);
});