// Executed when page is fully loaded.
$(document).ready(function(){


});

// Temporary interval to test the chat.
window.setInterval(function(){

  // Calculates height of the chatbox.
  var chatboxHeight = $(".chatbox").height();
  var scrolledToBottom = checkScroll(".chatbox");

  console.log(chatboxHeight);
  console.log("Scrolled bottom: " + scrolledToBottom);

  $(".chatbox").append('<div class="bubble"> <a href="#">[Name user]</a> <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span> </div>');

  if(scrolledToBottom == true) {
    $(".chatbox").scrollTop($(".chatbox").scrollTop() + chatboxHeight);
  }

}, 3000);

// Function to check if user is scrolled to bottom of the chatbox.
function checkScroll(e) {

  if($(e).scrollTop() + $(e).innerHeight() >= $(e)[0].scrollHeight) {
    return true;
  }

}
