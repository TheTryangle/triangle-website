<html>

<body>
<style>
#messages, #messages2, #messages3, #messages4{
    border-style: solid;
    display: block;
}
#text, #text2, #text3, #text4{
    width: 50%;
    margin: 1%;
}
</style>
<div id="messages">
</div>
<div id="input">
<form id="streamid" onsubmit="event.preventDefault();" action="">
    <input id="text" autocomplete="off" required/>
</form>
    <button onclick="joinChat()" type="button">Join</button>
</div>

<div id="messages2">
</div>
<div id="input2">
    <form id="streamid2" onsubmit="event.preventDefault();" action="">
        <input id="text2" autocomplete="off" required/>

    </form>
    <button onclick="joinChat()" type="button">Join</button>

</div>

<div id="messages3">
</div>
<div id="input3">
    <form id="streamid3" onsubmit="event.preventDefault();" action="">
        <input id="text3" autocomplete="off" required/>
    </form>
    <button onclick="joinChat()" type="button">Join</button>

</div>

<div id="messages4">
</div>
<div id="input4">
    <form id="streamid4" onsubmit="event.preventDefault();" action="">
        <input id="text4" autocomplete="off" required/>
    </form>
    <button onclick="joinChat()" type="button">Join</button>
</div>

</body>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="chat.js"></script>

</html>