// Video Data
var videoSocket;
// Video Queue
var videoQueue = [];
// Video Player
var videoPlayer = document.getElementById('videoplayer');
var streamsList = document.getElementById('streamslist');

var playing = false;

var pubKey;

var lastVideo;

//Event handlers
$(document).on('click', '#streamslist > li', function(e){

    switchStream($(this).data('streamid'));

});

function openWebSocket()
{
    videoSocket = new WebSocket('ws://localhost:1234/receive');

    videoSocket.onopen = function() {
        //Ask for public key from server
        videoSocket.send('PUBKEY');
        videoSocket.send('LIST');

        //Register a function to check for a list of streams
        setInterval(getStreamList, 10000);
    };

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
            else
            {
                let streams;
                //Probably JSON, try parsing it
                try{
                    streams = JSON.parse(event.data);
                }
                catch(e){
                    return;
                }

                streamsList.innerHTML = '';

                for(let stream of streams)
                {
                    let li = document.createElement('li');
                    li.class = 'stream';
                    li.dataset.streamid = stream.id;
                    li.innerHTML = '<a href="#">'+ stream.id +'</a>';

                    streamsList.appendChild(li);
                }
            }
        }

        //Log errors
        videoSocket.onerror = function(error) {
            console.log('WebSocket Error ' + error);
        };

        //Try to reconnect in 5 seconds
        videoSocket.onclose = function(){
            setTimeout(function(){openWebSocket()}, 5000);
        };
    };
}

openWebSocket();

//Play next fragment when the video ends.
videoPlayer.addEventListener('ended', function() {
    playing = false;
    playVideo();
}, false);


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
    let base64data;

    let reader = new window.FileReader();

    //Convert blob to base64.
    reader.readAsDataURL(lastVideo);
    reader.onloadend = function() {
        base64data = reader.result;

        base64data = base64data.substr(base64data.indexOf(',') + 1);

        //Initialize signature checkers
        let sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});

        sig.init(pubKey); // signer's certificate
        // update data
        sig.updateString(base64data);

        // verify signature
        if(!sig.verify(encryptedHash))
        {
            console.log("Signature verification failed!");

            let alertBox = document.createElement('div');
            alertBox.class = 'alert';
            alertBox.innerHTML = '<p>Possible tampering detected! Please reload the page to try again.</p>';
            document.body.appendChild(alertBox);
        }
    };
}

function getStreamList()
{
    videoSocket.send("LIST")
}

function switchStream(id)
{
    videoSocket.send('WATCH ' + id);
}