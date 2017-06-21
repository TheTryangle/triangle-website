var streamChat = new StreamChat(124, "Ritchie", 1);

streamChat.openConnection();
streamChat.promptUsername();
streamChat.listentoMessage();
streamChat.sendMessage();

var streamChat2 = new StreamChat(125, "Danny", 2);

streamChat2.openConnection();
streamChat2.promptUsername();
streamChat2.listentoMessage();
streamChat2.sendMessage();