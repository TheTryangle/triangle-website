class VideoPlayer{

    constructor(videoPlayerElement){
        this.videoPlayer = videoPlayerElement;

        this.videoQueue = [];
        this.lastVideo = null;
        this.playing = false;

        this.pubKey = null;

        this.webSocket = null;

        //Workaround for "this" falling out of scope in JS.
        var _this = this;

        //Play next fragment when the video ends.
        this.videoPlayer.addEventListener('ended', function() {
            _this.playing = false;
            _this._playVideo();
        }, false);
    }

    openWebSocket(idToWatch){
        this.webSocket = new WebSocket('ws://localhost:1234/receive');

        var _this = this;

        this.webSocket.onopen = function() {
            //Ask for public key from server
            _this.webSocket.send('PUBKEY');

            if(typeof idToWatch !== "undefined")
            {
                _this.watch(idToWatch);
            }
        };

        //Receive video and play fragment.
        this.webSocket.onmessage = function(event) {
            //If data is a blob, it's probably a video fragment.
            if(event.data instanceof Blob)
            {
                _this.lastVideo = event.data;

                _this.videoQueue.push(URL.createObjectURL(event.data));

                if(!this.playing)
                {
                    _this._playVideo();
                }
            }
            else
            {
                //Indicates we have received the public key
                if(event.data.startsWith('-----BEGIN PUBLIC KEY-----'))
                {
                    _this.pubKey = event.data;
                }
                else if(event.data.startsWith("SIGN:"))
                {
                    _this._checkHash(event.data.substr(6));
                }
                else if(event.data.startsWith("EXPECT:"))
                {
                    console.log(event.data);
                }
            }
        };

        //Log errors
        this.webSocket.onerror = function(error) {
            console.log('WebSocket Error ' + error);
        };

        //Try to reconnect in 5 seconds
        this.webSocket.onclose = function(){
            setTimeout(function(){_this.openWebSocket()}, 5000);
        };
    }

    watch(id){
        this.webSocket.send('WATCH ' + id);
    }

    getVideoElement(){
        return this.videoPlayer;
    }

    _playVideo(){
        if(this.videoQueue.length > 0)
        {
            this.playing = true;
            this.videoPlayer.src = this.videoQueue.shift();
            this.videoPlayer.load();
        }
    }

    _checkHash(encryptedHash)
    {
        var _this = this;

        let base64data;

        let reader = new window.FileReader();

        //Convert blob to base64.
        reader.readAsDataURL(this.lastVideo);
        reader.onloadend = function() {
            base64data = reader.result;

            base64data = base64data.substr(base64data.indexOf(',') + 1);

            //Initialize signature checkers
            let sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});

            sig.init(_this.pubKey); // signer's certificate
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
}