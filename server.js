var express = require("express");
var app     = express();

var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// Everything should be in constant
// If your port is occupied then server will throw an error
// In that case change the following variable
var appPort = 3000;

// Configure the static path
app.use(express.static(__dirname + '/app/templates'));
app.use('/scripts/vendor', express.static(__dirname + '/node_modules/'));
app.use('/scripts/js', express.static(__dirname + '/app/js'));
app.use('/styles/css', express.static(__dirname + '/app/css'));

// Add route to the server
app.get('/',function(req,res){
 	res.sendFile('index.html')
});

io.sockets.on('connection', function (socket) { // First connection
	console.log('connection arrived')
})

// Listen on
server.listen(appPort);

console.log("Running at Port " + appPort);