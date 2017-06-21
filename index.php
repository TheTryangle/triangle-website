<?php include "inc/header.php"; ?>
<div class="row">

  <div class="stream">
    <div class="video-container">
      <div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 video-outside">
          <div class="row">
            <div style="display:none;">
              <div class="video" data-player="1">
                <video id="videoplayer1" autoplay></video>
                <div class="stream-controls">
                  <button type="button" class="stream-button mute">Mute</button>
                  <button type="button" class="stream-button fullscreen">Fullscreen</button>
                </div>
              </div>
              <div class="chat">
                <div class="chat-head">
                  <span>[Name streamer]</span>
                  <button type="button" class="stream-button exit-stream"></button>
                </div>
                <div class="chat-box">
                  <div class="inside"></div>
                  <div class="chat-form">
                    <form class="" onsubmit="event.preventDefault();" action="#" method="post">
                      <input class="form-control" id="focusedInput" name="chat-input" type="text" placeholder="Type to chat.." required>
                      <input class="btn btn-success chat-button" name="chat-button" type="submit" value="Send">
                    </form>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="select-stream">+</button>
            <ul class="streamslist" style="display:none;"></ul>

          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 video-outside">
          <div class="row">
            <div style="display:none;">
              <div class="video" data-player="2">
                <video id="videoplayer2" autoplay></video>
                <div class="stream-controls">
                  <button type="button" class="stream-button mute">Mute</button>
                  <button type="button" class="stream-button fullscreen">Fullscreen</button>
                </div>
              </div>
              <div class="chat">
                <div class="chat-head">
                  <span>[Name streamer]</span>
                  <button type="button" class="stream-button exit-stream"></button>
                </div>
                <div class="chat-box">
                  <div class="inside"></div>
                  <div class="chat-form">
                    <form class="" onsubmit="event.preventDefault();" action="#" method="post">
                      <input class="form-control" id="focusedInput" name="chat-input" type="text" placeholder="Type to chat..">
                      <input class="btn btn-success chat-button" name="chat-button" type="submit" value="Send">
                    </form>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="select-stream">+</button>
            <ul class="streamslist" style="display:none;"></ul>

          </div>
        </div>

      </div>
      <div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 video-outside">
          <div class="row">
            <div style="display:none;">
              <div class="video" data-player="3">
                <video id="videoplayer3" autoplay></video>
                <div class="stream-controls">
                  <button type="button" class="stream-button mute">Mute</button>
                  <button type="button" class="stream-button fullscreen">Fullscreen</button>
                </div>
              </div>
              <div class="chat">
                <div class="chat-head">
                  <span>[Name streamer]</span>
                  <button type="button" class="stream-button exit-stream"></button>
                </div>
                <div class="chat-box">
                  <div class="inside"></div>
                  <div class="chat-form">
                    <form class="" onsubmit="event.preventDefault();" action="#" method="post">
                      <input class="form-control" id="focusedInput" name="chat-input" type="text" placeholder="Type to chat..">
                      <input class="btn btn-success chat-button" name="chat-button" type="submit" value="Send">
                    </form>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="select-stream">+</button>
            <ul class="streamslist" style="display:none;"></ul>

          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 video-outside">
          <div class="row">
            <div style="display:none;">
              <div class="video" data-player="4">
                <video id="videoplayer4" autoplay></video>
                <div class="stream-controls">
                  <button type="button" class="stream-button mute">Mute</button>
                  <button type="button" class="stream-button fullscreen">Fullscreen</button>
                </div>
              </div>
              <div class="chat">
                <div class="chat-head">
                  <span>[Name streamer]</span>
                  <button type="button" class="stream-button exit-stream"></button>
                </div>
                <div class="chat-box">
                  <div class="inside"></div>
                  <div class="chat-form">
                    <form class="" onsubmit="event.preventDefault();" action="#" method="post">
                      <input class="form-control" id="focusedInput" name="chat-input" type="text" placeholder="Type to chat..">
                      <input class="btn btn-success chat-button" name="chat-button" type="submit" value="Send">
                    </form>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" class="select-stream">+</button>
            <ul class="streamslist" style="display:none;"></ul>

          </div>
        </div>

      </div>
    </div>
  </div>

</div>

<div id="certconfirmationdialog" class="dialog" style="display: none;">
    <p>An unknown certificate was received from the server. Are you sure you want to trust this certificate?</p>
    <p id="pubkeyhash">Hash of the server's public key: </p>
</div>

<div id="signaturewarningdialog" class="dialog" style="display: none;">
    <p>Possible tampering detected! The video player has been closed for your security. Please try again.</p>
</div>

<?php include "inc/footer.php"; ?>
