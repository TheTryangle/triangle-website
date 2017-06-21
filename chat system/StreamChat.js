/*
Reminder
JSON to send
 {
 "StreamId": "id",
 "Timestamp": 2342525,
 "Message": "",
 "ActionType":  2
 }

ActionType:
 NONE = 0,
 MESSAGE = 1,
 JOIN = 2,
 LEAVE = 3
 */

class StreamChat {

    constructor(chatElements) {
        this.streamChat = chatElements;
        this.webSocket = null;
        this.chattingType = null;
        this. streamerid = null;
        this.name = null;

        var _this = this;
    }

    openWebsocket(streamerid, ip, your_name){
        this.webSocket = new WebSocket(ipAddress);

        var _this = this;
        _this.name = your_name;
        _this.streamerid = streamerid;
        this.webSocket.onopen = function () {
            
        }
    }



}