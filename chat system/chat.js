// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:5000/chat');
var person;
var streamerid;

// Connection opened
socket.addEventListener('open', function (event) {

    //socket.send('Hello Server');

});

// Listen for messages
socket.addEventListener('message', function (event) {
    //console.log('Message from server', event.data);
});

window.addEventListener("beforeunload", function(e){
    //socket.send('Someone disconnected');
}, false);

socket.onopen = function (event){

    getName();
 	//socket.send('Someone connected');
console.log(event.data);
 	var text1 = document.getElementById("messages2");
 	text1.setAttribute("id", "message4")
};


socket.onclose = function (event) {
    //socket.send('closed');
};

socket.onmessage = function(event){

	var text = "";
console.log(event.data);
	if(person === null || person === ""){
        getName();
    }else {

        if (isJson(event.data)) {

            // var msg = JSON.parse(event.data);
            // var text = msg.text;
            // var user = msg.name;

            $('#messages').append(user + ":\n" + text + "<br \>");
        } else {
            $('#messages').append(event.data + "<br \>");
        }
    }
};

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function join(json){
    return socket.send(JSON.stringify(json));
}

function getName(){
    person = prompt("Please enter your name", "Harry Potter");

    if (person == null || person == "") {
        person = prompt("Please enter a name", "");
    } else {
        //socket.send("NAME " + person);
    }
}

//send to all users
$(document).ready( function() {

    //console.log('Test');
    $('form').submit(function () {
        //msg object with data from the server
        var msg = {

            //name: person,
            StreamID: "Hallo",
            Timestamp: Date.now(),
            Message: document.getElementById("text").value,
            ActionType: 1
        };
console.log(msg);
        join(msg);
        document.getElementById("text").value = "";

        event.preventDefault();
    });
});