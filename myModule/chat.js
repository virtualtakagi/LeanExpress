    myFunc = require('./module')
    chat = io.sockets.on('connection', function(client) {

        client.emit('inputRoom');
    
        // クライアントに接続成功を送信する
        client.on('checkRoom', function(room){
            // Room入室処理
            if(myFunc.checkRoom(room)){
                client.name = myFunc.setName();
                client.room = room;
                client.join(client.room);
                //chat.to(client.room).emit('chat', myFunc.checkInRoomMsg(client.room, client.name));
                chat.to(client.room).emit('chat', {msg:'test message'});
                console.log("Entering " + client.name + " Room No." + client.room);
            } else if(room === null){
                client.disconnect(true);
            } else {
                client.emit('inputRoom');
            }
        });
    
        // クライアントの発言
        client.on('chat', function(msg){
            if(myFunc.checkMsgString(msg) && myFunc.checkMsgLength(msg) && myFunc.checkMsgSpace(msg)){
                chat.to(client.room).emit('chat', client.name + ' > ' + msg);
            }
        });
    
        // クライアントの退室
        client.on('disconnect', function() {
            client.leave(client.room);
            chat.to(client.room).emit('chat', myFunc.checkLeaveRoomMsg(client.room, client.name));
            console.log("Leave " + client.name + " from Room No." + client.room);
        });
        
    });
    

module.exports = chat;