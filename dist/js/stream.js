/**
 * @global VideoPlayer
 */

if(localStorage.getItem('trustedCerts') === null)
{
    localStorage.setItem('trustedCerts', JSON.stringify([]));
}

var trustedCertificates = JSON.parse(localStorage.getItem('trustedCerts'));

//Open a websocket for a list of streams
var listSocket = new WebSocket('ws://188.226.164.87/server/receive');

listSocket.onerror = function(error) {
  console.error('WebSocket Error:');
  console.error(error);

  $('ul.streamslist').empty();
  $('ul.streamslist').append('<span>Sorry, the server is offline.</span>');
};

function getStreamList()
{
    listSocket.send('LIST');
}

var videoPlayers = [];

function switchStream(id, playerNumber)
{
  if(typeof videoPlayers[playerNumber] === 'undefined' || videoPlayers[playerNumber] === null)
    {
        videoPlayers[playerNumber] = new VideoPlayer(document.getElementById('videoplayer' + playerNumber));
        videoPlayers[playerNumber].openWebSocket(id);
    }
    else
    {
        videoPlayers[playerNumber].watch(id);
    }

    // Show video and hide streamerslist.
    $('#videoplayer' + playerNumber).parent().parent().css("display", "block").queue(function() {
      $(this).parent().find("ul").hide();
      $(this).dequeue();
    });

}

function closeVideoPlayer(videoPlayerNumber)
{
    videoPlayers[videoPlayerNumber].close();
    videoPlayers[videoPlayerNumber] = null;
}


function askTrustPublicKey(pubKey, videoPlayer)
{
    $('#certconfirmationdialog').dialog({
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        open: function(){

            let hashText = document.getElementById('pubkeyhash');

            //Hash public key and show it to client.
            let md = forge.md.sha1.create();
            md.update('pubKey');
            hashText.appendChild(document.createTextNode(md.digest().toHex()));

        },
        buttons: {
            'Confirm and trust certificate'(){
                trustedCertificates.push(pubKey);
                localStorage.setItem('trustedCerts', JSON.stringify(trustedCertificates));

                videoPlayer.trustPublicKey(pubKey);

                $(this).dialog('close');
            },

            'Confirm once'(){
                videoPlayer.trustPublicKey(pubKey);
                $(this).dialog('close');
            },

            'Cancel'(){
                $(this).dialog('close');
            }
        }
    });
}

videoPlayers[1] = new VideoPlayer(document.getElementById('videoplayer1'));
videoPlayers[1].openWebSocket();

var streamsList = document.getElementsByClassName('streamslist');

listSocket.onopen = function(){
    //Register a function to check for a list of streams
    setInterval(getStreamList, 10000);

    getStreamList();
};

listSocket.onmessage = function(event){
    let streams;

    //Probably JSON, try parsing it
    try{
        streams = JSON.parse(event.data);
    }
    catch(e){
        return;
    }

    $(streamsList).html('');

    // If there are streams online.
    if (typeof streams !== 'undefined' && streams.length > 0) {

      for(let stream of streams)
      {
          //Create li element to insert.
          let li = document.createElement('li');
          li.class = 'stream';
          li.dataset.streamid = stream.ClientID;

          //Create anchor element for li.
          //createTextNode() is used to safely insert the stream ID without any XSS.
          let anchor = document.createElement('a');
          anchor.href = '#';
          anchor.appendChild(document.createTextNode(stream.ClientID));
          li.appendChild(anchor);

          for(let streamlist of streamsList)
          {
              streamlist.appendChild(li.cloneNode(true));
          }
      }

    } else {
      $('ul.streamslist').append('<span>Sorry, no streams online.</span>');
    }

};

//Event handlers
$(document).on('click', '.select-stream', function(e){

    $(this).hide();
    $(this).parent().find('ul').show();

});

$(document).on("click", ".streamslist > li", function() {

  switchStream($(this).data('streamid'), Number($(this).closest(".video-outside").find('div.video').data('player')));

});

$(document).on('click', '.exit-stream', function() {

  var player = $(this).parent().parent().siblings();

  closeVideoPlayer(player.data('player'));

  player.parent().css('display', 'none');
  player.parent().siblings('button').show();

});
