$(document).ready(main);
var username = '';
var socket;

function main() {
	socket = io.connect();
	bindIncomingMessage();
	bindEventOnInputText();
	bindSendClick();
	bindUserNameChange();
	bindUserChange();
}

function bindEventOnInputText(){
	$('.chat-input-message input').keypress(onKeyPressOnInput);
}

function bindUserNameChange(){
	$('.expect-user-name input').keypress(onUserNameChange);
}

function onKeyPressOnInput(event){
	if(event.which == 13){
		sendMessage();
		event.preventDefault();
		event.stopPropagation();
	}
}

function bindIncomingMessage() {
	socket.on('message', onIncomingMessage);
}

function onIncomingMessage(data){
	addMessage(data);
}

function addMessage(data,myMsg){
	var msgClass = myMsg ? 'message my-message' : 'message',
		msg = '<div class="' + msgClass + '">' +
			'<div class="message-text">' + data.message + '</div>' + 
			'</div>';
	document.getElementById('chat-container').innerHTML += msg;
	scrollItem();
}

function scrollItem(){
	$('.message').last().fadeIn()[0].scrollIntoView();
}

function sendMessage(){
	var msg = $('.chat-input-message input').val();
	socket.emit('message',msg);
	addMessage({ message : msg} ,true);
	$('.chat-input-message input').val('');
}

function bindSendClick(){
	$('.chat-hit-enter').click(sendMessage)
}

function onUserNameChange(event){
	if(event.which == 13){
		setUserName(event);
	}
}

function setUserName(){
	var name = $('.expect-user-name input').val();
	socket.emit('newUser',{ username : name});
	$('.modal').fadeOut();
	username = name;
	refreshUsers({ list: [username]} )	
}

window.addEventListener("beforeunload", function (e) {

  socket.emit('remove',{username : username});
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage;                            //Webkit, Safari, Chrome
});

function bindUserChange(){
	socket.on('refreshUsers', refreshUsers);
}

function refreshUsers(data){
	var list = data.list.map(function(user){
		return '<div class="user">' + user + '</div>';
	});
	document.getElementById('online-people').innerHTML = list.join('');
}