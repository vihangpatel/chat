var express = require("express");
var app     = express();

// Everything should be in constant
// If your port is occupied then server will throw an error
// In that case change the following variable
var appPort = 3000;

// Configure the static path
app.use(express.static(__dirname + '/app/templates'));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist/'));

// Add route to the server
app.get('/',function(req,res){
 	res.sendFile('index.html')
});

// Listen on
app.listen(appPort);

console.log("Running at Port " + appPort);