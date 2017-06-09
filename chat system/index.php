<html>

<body>
<style>
#messages{
    border-style: solid;
    display: block;
}
#text{
    width: 50%;
    margin: 1%;
}
</style>
<div id="messages">
</div>
<div id="input">
<form id="form" onsubmit="event.preventDefault();" action="">
    <input id="text" autocomplete="off" />
</form>
Your name: <input id="user"/>
</div>
</body>

<script src="https://code.jquery.com/jquery-1.11.1.js"></script>
<script src="chat.js"></script>

</html>