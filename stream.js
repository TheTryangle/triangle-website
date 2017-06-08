// Video Data 
var videoSocket = new WebSocket('ws://145.49.35.215:1234/receive');
// Video Queue
var videoQueue = [];
// Video Player
var videoPlayer = document.getElementById('videoplayer');

var playing = false;

// Debugging //
videoSocket.binaryType = "arraybuffer";
// When the connection is open, send some data to the server
videoSocket.onopen = function() {
    videoSocket.send('Ping'); // Send the message 'Ping' to the server
};
// Log errors
videoSocket.onerror = function(error) {
    console.log('WebSocket Error ' + error);
};

// Stop Video when ended
videoPlayer.addEventListener('ended', function() {
    playing = false;
    playVideo();
}, false);

// Play Video on Data receive
videoSocket.onmessage = function(event) {
    console.log(event.data);
    videoQueue.push(URL.createObjectURL(event.data));

    if(!playing) {
        playVideo();
    }
}

// Start Video
function playVideo() {
    if(videoQueue.length > 0) {
        playing = true;
        videoPlayer.src = videoQueue.shift();
        videoPlayer.load();
    }
}