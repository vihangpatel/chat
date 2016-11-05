$(document).ready(main);

var socket;

function main() {
	socket = io.connect();
	bindIncomingMessage();
	bindEventOnInputText();
}

function bindEventOnInputText(){
	$('.chat-input-message input').keypress(onKeyPressOnInput)
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