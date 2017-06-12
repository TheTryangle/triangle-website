// Executed when page is fully loaded.
$(document).ready(function(){

  // Show / hide video controls on hover.
  $(".video").on("mouseenter", showControls).on("mouseleave", hideControls);

  // (Un)mute video on click.
  $(".mute").on("click", muteVideo);

  // Set fullscreen on click.
  $(".fullscreen").on("click", fullscreenVideo);

  $('#login-form-link').on("click", showLogin);
	$('#register-form-link').on("click", showRegister);

});

// Temporary interval to test the chat.
window.setInterval(function() {

  // Calculates height of the chatbox.
  var chatboxHeight = $(".chatbox").height();
  var scrolledToBottom = checkScroll(".chatbox");

  $(".chatbox").append('<div class="bubble"> <a href="#">[Name user]</a> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span> </div>');

  if(scrolledToBottom == true) {
    $(".chatbox").scrollTop($(".chatbox").scrollTop() + chatboxHeight);
  }

}, 3000);

// Functions ---------------------------------------------------------

// Function to check if user is scrolled to bottom of the chatbox.
function checkScroll(e) {

  if($(e).scrollTop() + $(e).innerHeight() >= $(e)[0].scrollHeight) {
    return true;
  }

}

// Function to show video controls.
function showControls() {
  $(this).find(".stream-controls").stop().fadeIn(300);
}

// Function to hide video controls.
function hideControls() {
  $(this).find(".stream-controls").stop().fadeOut(300);
}

// Function to mute or unmute video.
function muteVideo() {
  var video = $(this).parent().parent().find("video");

  if($(video).prop("muted")) {

    $(video).prop("muted", false);
    $(this).text("Mute");

  } else {

    $(video).prop("muted", true);
    $(this).text("Unmute");

  }
}

// Function to set or unset video to fullscreen.
function fullscreenVideo() {
  var video = $(this).parent().parent().find("video");

  if(video.parent().hasClass("fullscreen")) {
    $.fullscreen.exit();
    video.parent().removeClass("fullscreen");
    return false;
  } else {
    video.fullscreen();
    video.parent().addClass("fullscreen");
    return false;
  }

}

// Function to show login form.
function showLogin() {
    $("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
}

// Function to show register form.
function showRegister() {
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
}
