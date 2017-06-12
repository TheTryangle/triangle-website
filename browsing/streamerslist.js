// Variables //
// Json Object 
var jsonObject = '[{"name":"Ritchie", "title":"Op school"},{"name":"Danny", "title":"Thuis eten"},{"name":"Hugo", "title":"Niks doen"}]';
// Json Parsed
var streamers = JSON.parse(jsonObject);

// Debugging //
// Print names into Console
//console.log(streamers[1]['name']);

// Methods //
// Loop through Json List and append new Streamer with ID
$.each(streamers, function(index, object) {
    $(".stream-items").append("<div id='stream-item-" + index + "' class='col-xs-12 col-sm-6 col-md-4 col-lg-3 stream-item'>");
    $("#stream-item-" + index + "").append("<a id='stream-link-" + index + "' href='#'>");
    $("#stream-link-" + index + "").append("<div id='stream-thumb-" + index + "' class='thumb'>");
    $("#stream-thumb-" + index + "").append("<span class='streamer-name'>" + object.name + "</span>");
    // Image appenden
    $("#stream-thumb-" + index + "").append("</div>");

    $("#stream-link-" + index + "").append("<span class='streamer-title'>" + object.title + "</span>");
    $("#stream-link-" + index + "").append("</a>");
    $("#stream-item-" + index + "").append("</div>");
    $("#stream-item-" + index + "").append("<br><br>");
});