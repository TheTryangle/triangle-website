class StreamChat {

    constructor(streamerID, streamerName, streamChannel,) {
        this.streamerID = streamerID;
        this.streamChannel = streamChannel;

        this.clientName;

        this.socket = new WebSocket("ws://145.49.35.215:5000/chat");
        this.connected = false;

    }

    openConnection() {
        var _this = this;

        _this.socket.onopen = function (event){
            console.log("Connected...");
            _this.connected = true;
        };
    }

    closeConnection() {
        // EMPTY
    }

    promptUsername() {
        var _this = this;

        if(_this.connected = true) {
            console.log("Username prompted:");
            _this.clientName = prompt("Please enter your name", "test");

            if (_this.clientName != null) {
                console.log("Hello " + _this.clientName);
            }
        }
    }

    listentoMessage() {
        var _this = this;

        if(_this.connected = true) {
            console.log("Listening...")

            _this.socket.onmessage = function(event){
                
            };
        }
    }

    sendMessage() {
        var _this = this;
        console.log("Sending messages...");
        
        $("#form-" + _this.streamChannel).submit(function() {
            var msgString = $("#text-" + _this.streamChannel).val()

            var message = {
                StreamID: _this.streamerID,
                Timestamp: Date.now(),
                Message: msgString,
                ActionType: 1
            };

            console.log(message);
            $("#channel-" + _this.streamChannel).append(_this.clientName + ": " + msgString + "<br\>");

            _this.socket.send(JSON.stringify(message));
        });
    }
    
}