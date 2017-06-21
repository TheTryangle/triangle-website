// Create WebSocket connection.
var person;

// Connection opened
socket.addEventListener('open', function (event) {
    //socket.send('Hello Server');
    console.log("Send to server");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server', event.data);
});

window.addEventListener("beforeunload", function (e) {
    //socket.send('Someone disconnected');
    console.log("test");
}, false);

socket.onerror = function (error) {
    console.error('WebSocket Error:');
    console.error(error);
}

socket.onopen = function (event) {

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

socket.onmessage = function (event) {

    var text = "";
    console.log(event.data);
    if (person === null || person === "") {
        getName();
    } else {
        if (isJson(event.data)) {
            addMessage(JSON.parse(event.data));
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

function join(json) {
    return socket.send(JSON.stringify(json));
}

function getName() {
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
$(document).ready(function () {
    getName();

    //console.log('Test');
    $('form').submit(function () {
        //msg object with data from the server
        var streamId = $(this).closest('div').parent().find('.inside').attr("streamid");

        var msg = {
            Name: person,
            StreamID: streamId,
            Timestamp: Date.now(),
            Message: $(this).closest('div').find("#focusedInput").val(),
            ActionType: 1
        };
        //console.log(msg);
        join(msg);
        //$('#messages').append('Someone' + ":\n" + document.getElementById("focusedInput").value + "<br \>")

        addMessage(msg);
        $(this).closest('div').find("#focusedInput").val("");

        event.preventDefault();
    });

    $(document).on("click", ".streamslist > li", function () {
        var streamId = $(this).data('streamid');
        joinChat(streamId); // get id of clicked li
        $(this).closest('div').find(".inside").attr("streamid", streamId);
    });
});

function addMessage(msgObj) {
    var text = msgObj.Message;
    var user = msgObj.Name;

    //$( text).appendTo( msg.StreamID );
    $('<div>' + user + ': ' + text + '</div>').appendTo('.inside[streamid=\'' + msgObj.StreamID + '\']');
}