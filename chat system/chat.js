// Create WebSocket connection.
const socket = new WebSocket('ws://145.49.35.215:5000/chat');
var person;
var streamerid;

// Connection opened
socket.addEventListener('open', function (event) {
    //socket.send('Hello Server');
    console.log("Send to server");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server', event.data);
});

window.addEventListener("beforeunload", function(e){
    //socket.send('Someone disconnected');
    console.log("test");
}, false);

socket.onerror = function (error) {
    console.error('WebSocket Error:');
    console.error(error);
}

socket.onopen = function (event){

    //getName();
 	//socket.send('Someone connected');
// console.log(event.data);
//  	var text1 = document.getElementById("messages2");
//  	text1.setAttribute("id", "message4")
};


socket.onclose = function (event) {
    var msg = {
        Timestamp: Date.now(),
        ActionType: 3
    };
    join(msg);
};

socket.onmessage = function(event){

    var text = "";
    console.log(event.data);
    if(person === null || person === ""){
        getName();
    }else {
        if (isJson(event.data)) {

            var msg = JSON.parse(event.data);
            var text = msg.Message;
            var user = msg.Name;

            //$( text).appendTo( msg.StreamID );
            $('<div>Name: ' + name +  ', '+ text + '</div>').appendTo('#' + msg.StreamId);
        } else {
            $(".inside").find(".inside").append(event.data + "<br \>");
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

function joinChat(streamerID) {

    var msg = {

        //name: person,
        StreamID: streamerID,
        Timestamp: Date.now(),
        ActionType: 2
    };
    join(msg);
}

//send to all users
$(document).ready( function() {
    //console.log('Test');
    $('form').submit(function () {
        //msg object with data from the server
        var msg = {

            Name: "Someone",
            StreamID: streamerid,
            Timestamp: Date.now(),
            Message: $(this).closest('div').find("#focusedInput").val(),
            ActionType: 1
        };
//console.log(msg);
        join(msg);
        //$('#messages').append('Someone' + ":\n" + document.getElementById("focusedInput").value + "<br \>")
        $(this).parent().prev().append('Someone' + ":\n" + $(this).closest('div').find("#focusedInput").val()  + "<br \>");
        $(this).closest('div').find("#focusedInput").val("");

        event.preventDefault();
    });

    $(document).on("click", ".streamslist > li", function() {
        joinChat($(this).data('streamid')); // get id of clicked li
        streamerid = $(this).data('streamid');
        $(this).closest('div').find(".inside").attr("id", streamerid);
    });
});