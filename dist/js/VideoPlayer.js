class VideoPlayer{

    constructor(videoPlayerElement){
        this.videoPlayer = videoPlayerElement;

        this.videoQueue = [];
        this.lastVideo = null;
        this.playing = false;

        this.pubKey = null;

        this.webSocket = null;

        //As long as the streaming server has not verified its identity yet, this property is false.
        this.trustedConnection = false;

        //String used for challenge.
        this.challenge = '';

        //Workaround for "this" falling out of scope in closures.
        var _this = this;

        this.endedListener = function(){
            _this.playing = false;
            _this._playVideo();
        };

        //Play next fragment when the video ends.
        this.videoPlayer.addEventListener('ended', this.endedListener, false);
    }

    openWebSocket(idToWatch){
        this.webSocket = new WebSocket('ws://localhost:5000/receive');

        var _this = this;

        this.webSocket.onopen = function() {
            //Ask for public key from server
            _this.webSocket.send('PUBKEY');

            if(typeof idToWatch !== 'undefined')
            {
                _this.watch(idToWatch);
            }
        };

        //Receive video and play fragment.
        this.webSocket.onmessage = function(event) {
            //If data is a blob, it's probably a video fragment.
            if(event.data instanceof Blob)
            {
                //If the connection has not been verified yet, we do not want to accept any binary data.
                if(!_this.trustedConnection)
                {
                    return;
                }

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
                    _this._challengeServer(event.data);
                }
                else if(event.data.startsWith('SIGN: '))
                {
                    _this._checkHash(event.data.replace('SIGN: ', ''));
                }
                else if(event.data.startsWith('CHALLENGERESPONSE: '))
                {
                    _this._verifyChallenge(event.data.replace('CHALLENGERESPONSE: ', ''));
                }
            }
        };

        //Log errors
        this.webSocket.onerror = function(error) {
          console.error('WebSocket Error:');
          console.error(error);

          $('ul.streamslist').empty();
          $('ul.streamslist').append('<span>Sorry, the server is offline.</span>');
        };

        //Try to reconnect in 5 seconds
        this.webSocket.onclose = function(){
            setTimeout(function(){_this.openWebSocket()}, 5000);
        };
    }

    watch(id){
        this.webSocket.send('WATCH ' + id);
    }

    close(){
        this.webSocket.close();
        this.videoQueue = [];
        this.videoPlayer.removeEventListener('ended', this.endedListener, false);
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

    _challengeServer(pubKey){
        this.pubKey = pubKey;

        let rsa = forge.pki.rsa;

        this.challenge = btoa(forge.random.getBytesSync(32));

        let pubKeyForge = forge.pki.publicKeyFromPem(pubKey);

        let challengeMessage = btoa(pubKeyForge.encrypt(this.challenge));

        this.webSocket.send('CHALLENGE: ' + challengeMessage);
    }

    _verifyChallenge(msg){
        if(msg === this.challenge)
        {
            console.log('Challenge successful!');

            //Check if the public key is already trusted by the browser. If not, ask to trust.
            if(trustedCertificates.indexOf(this.pubKey) > -1)
            {
                this.trustedConnection = true;
            }
            else
            {
                askTrustPublicKey(this.pubKey, this);
            }
        }
        else
        {
            console.log('Verification failed! The server might be an impostor.');
        }
    }

    trustPublicKey(pubKey){
        if(pubKey === this.pubKey)
        {
            this.trustedConnection = true;
        }
    }

    _checkHash(encryptedHash)
    {
        let _this = this;

        let base64data;

        let reader = new window.FileReader();

        //Convert blob to base64.
        reader.readAsDataURL(this.lastVideo);
        reader.onloadend = function() {
            base64data = reader.result;

            base64data = base64data.substr(base64data.indexOf(',') + 1);

            //Initialize signature checkers
            let sig = new KJUR.crypto.Signature({'alg': 'SHA1withRSA'});

            sig.init(_this.pubKey); // signer's certificate
            // update data
            sig.updateString(base64data);

            // verify signature
            if(!sig.verify(encryptedHash))
            {
                console.log('Signature verification failed!');

                let alertBox = document.createElement('div');
                alertBox.class = 'alert';
                alertBox.innerHTML = '<p>Possible tampering detected! Please reload the page to try again.</p>';
                document.body.appendChild(alertBox);
            }
        };
    }
}
