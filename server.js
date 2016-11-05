var express = require("express");
var app     = express();

// Everything should be in constant
// If your port is occupied then server will throw an error
// In that case change the following variable
var appPort = 3000;


// Add route to the server
app.get('/',function(req,res){
 	res.send('Yoooo My server worked')
});

// Listen on
app.listen(appPort);

console.log("Running at Port " + appPort);