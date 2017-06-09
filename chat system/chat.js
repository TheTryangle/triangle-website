// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:1234/send');

// Connection opened
socket.addEventListener('open', function (event) {

    //socket.send('Hello Server');

});

// Listen for messages
socket.addEventListener('message', function (event) {
    //console.log('Message from server', event.data);
});

window.addEventListener("beforeunload", function(e){
    socket.send('Someone disconnected');
}, false);

socket.onopen = function (event){
	socket.send('Someone connected');
}


socket.onclose = function (event) {
    socket.send('closed');
}

socket.onmessage = function(event){

	var text = "";

	if(isJson(event.data)) {

        var msg = JSON.parse(event.data);
        var text = msg.text;
        var user = msg.name;

        $('#messages').append(user + ":\n" + text + "<br \>");
    }else {
        $('#messages').append(event.data + "<br \>");
    }
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

//send to all users
$(document).ready( function() {

    //console.log('Test');
    $('form').submit(function () {
        //msg object with data from the server
        var msg = {
            type: "message",
            text: document.getElementById("text").value,
            name: document.getElementById("user").value,
            date: Date.now()
        };

        socket.send(JSON.stringify(msg));

        document.getElementById("text").value = "";

        event.preventDefault();
    });

});