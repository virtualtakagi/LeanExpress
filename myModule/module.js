const mongoose = require('mongoose');

module.exports.checkName = function(name){
    if((name === null) 
        || (name.length > 8)
        || (name.length <= 0)
        || (/^[^あ-ん0-9a-zA-Z_@\-]+$/.test(name))) return false;
    return true;
}

module.exports.checkRoom = function(room){
    return /^[1-3]{1}$/.test(room);
}

module.exports.checkInRoomMsg = function(room, name){
    var time = this.getNow();
    return time + " " + "Room No." + room + " > " + name + " さんが入室しました";
}

module.exports.checkLeaveRoomMsg = function(room, name){
    var time = this.getNow();
    return time + " " + "Room No." + room + " > " + name + " さんが退出しました";
}

module.exports.checkMsgLength = function(msg){
    if(msg.length > 0 && 140 >= msg.length){
        return true;
    }
    return false;
}

module.exports.checkMsgSpace = function(msg){
    if(/^( |　)+$/.test(msg)){
        return false;
    }
    return true;
}

module.exports.checkMsgString = function(msg){
    if(typeof msg !== 'string'){
        return false;
    }
    return true;
}

module.exports.checkRoomClients = function(inClientsNum){
    var maxClients = 1;

    if (inClientsNum > (maxClients + 1)){
         return false;
    }
    return true;
}

module.exports.getNow = function(){
    var d = new Date()
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    var time = "[" + hour + ":" + min + ":" + sec + "]";
    return time;
}

module.exports.connectDb = function(){
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'mongo connection error ctrl + c'));
    db.once('open', () => {
        console.log('connecting...');
        mongoose.disconnect();
    });

    db.on('close', function(){
        console.log('disconnected.');
    })
}