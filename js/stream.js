if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

$(document).ready(function(){

    // Video Data
    var videoSocket = new WebSocket('ws://localhost:1234/receive');
    // Video Queue
    var videoQueue = [];
    // Video Player
    var videoPlayer = document.getElementById('videoplayer');

    var playing = false;

    var pubKey;

    var lastVideo;

    // When the connection is open, send some data to the server
    videoSocket.onopen = function() {
        //Ask for public key from server
        videoSocket.send('PUBKEY');
    };

    //Log errors
    videoSocket.onerror = function(error) {
        console.log('WebSocket Error ' + error);
    };

    //Play next fragment when the video ends.
    videoPlayer.addEventListener('ended', function() {
        playing = false;
        playVideo();
    }, false);

    //Receive video and play fragment.
    videoSocket.onmessage = function(event) {
        //If data is a blob, it's probably a video fragment.
        if(event.data instanceof Blob)
        {
            lastVideo = event.data;

            videoQueue.push(URL.createObjectURL(event.data));

            if(!playing)
            {
                playVideo();
            }
        }
        else
        {
            //Indicates we have received the public key
            if(event.data.startsWith('-----BEGIN PUBLIC KEY-----'))
            {
                /*
                 //Remove begin/end public key lines.
                 pubKey = event.data;
                 pubKey = pubKey.split("\n");
                 pubKey.shift();
                 pubKey.pop();

                 pubKey = pubKey.join("\n");
                 */

                pubKey = event.data;
            }
            else if(event.data.startsWith("SIGN:"))
            {
                checkHash(event.data.substr(6));
            }
            else if(event.data.startsWith("EXPECT:"))
            {
                console.log(event.data);
            }
        }
    };

    //If a video is queued, play it.
    function playVideo()
    {
        if(videoQueue.length > 0)
        {
            playing = true;
            videoPlayer.src = videoQueue.shift();
            videoPlayer.load();
        }
    }

    function checkHash(encryptedHash)
    {
        var base64data;

        var reader = new window.FileReader();

        //Convert blob to base64.
        reader.readAsDataURL(lastVideo);
        reader.onloadend = function() {
            base64data = reader.result;

            base64data = base64data.substr(base64data.indexOf(',') + 1);

            //Initialize signature checkers
            var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});

            sig.init(pubKey); // signer's certificate
            // update data
            sig.updateString(base64data);

            // verify signature
            if(!sig.verify(encryptedHash))
            {
                console.log("Signature verification failed!");

                var html = `<div class="alert">
                                <p>Possible tampering detected! Please reload the page to try again.</p>
                            </div>`;

                $(html).appendTo(document.body);
            }
        };
    }

});