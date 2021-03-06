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

var users = [];

io.sockets.on('connection', function (socket) { // First connection
	console.log('connection arrived');

	socket.on('message',function(data){
		socket.broadcast.emit('message', { message : data })
	});

	socket.on('newUser',function(data){
		users.push(data.username);
		socket.broadcast.emit('refreshUsers',{ list : users});
	});

	socket.on('remove',removeUser)

	socket.on('disconnect',removeUser)

	function removeUser(data){
		users = users.filter(function(username){
			return data.username != username;
		});
		console.log(users , ' ' , data);
		socket.broadcast.emit('refreshUsers',{ list : users});
	
	}
})



// Listen on
server.listen(appPort);

console.log("Running at Port " + appPort);