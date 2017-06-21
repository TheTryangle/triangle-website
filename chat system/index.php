<html>
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
<body>

<div id="channel-1"></div>
<div id="input">
    <form id="form-1" onsubmit="event.preventDefault();" action="">
        <input id="text-1" autocomplete="off" required/>
    </form>

    <button onclick="joinChat()" type="button">Join</button>
</div>

<div id="channel-2"></div>
<div id="input">
    <form id="form-2" onsubmit="event.preventDefault();" action="">
        <input id="text-2" autocomplete="off" required/>
    </form>

    <button onclick="joinChat()" type="button">Join</button>
</div>

<div id="channel-3"></div>
<div id="input">
    <form id="form-3" onsubmit="event.preventDefault();" action="">
        <input id="text-3" autocomplete="off" required/>
    </form>

    <button onclick="joinChat()" type="button">Join</button>
</div>

<div id="channel-4"></div>
<div id="input">
    <form id="form-4" onsubmit="event.preventDefault();" action="">
        <input id="text-4" autocomplete="off" required/>
    </form>

    <button onclick="joinChat()" type="button">Join</button>
</div>

</body>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="StreamChat.js"></script>
<script src="chat.js"></script>
<!--<script src="test.js"></script>-->

</html>